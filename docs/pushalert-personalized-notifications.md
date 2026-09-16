# PushAlert Personalized Notifications

## 1. Database

Create a subscriber mapping table. Keep multiple rows per user because the same member can subscribe from iPhone, desktop Chrome, Android, etc.

```sql
CREATE TABLE pushalert_subscribers (
  fld_id INT PRIMARY KEY AUTO_INCREMENT,
  fld_subscriber_id VARCHAR(190) NOT NULL,
  fld_user_id INT NULL,
  fld_member_id INT NULL,
  fld_role VARCHAR(50) NULL,
  fld_name VARCHAR(150) NULL,
  fld_email VARCHAR(150) NULL,
  fld_mobile VARCHAR(30) NULL,
  fld_branch_id INT NULL,
  fld_source VARCHAR(50) NULL,
  fld_is_active TINYINT(1) DEFAULT 1,
  fld_last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  fld_created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  fld_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_pushalert_subscriber (fld_subscriber_id),
  KEY idx_pushalert_member (fld_member_id),
  KEY idx_pushalert_user (fld_user_id),
  KEY idx_pushalert_branch (fld_branch_id)
);
```

## 2. Save Subscriber API

Add this under your `pushalert` router.

```js
router.post("/SaveSubscriber", async (req, res) => {
  try {
    const {
      subscriberId,
      userId,
      memberId,
      role,
      name,
      email,
      mobile,
      branchId,
      source,
    } = req.body;

    if (!subscriberId) {
      return res.status(400).json({ success: false, message: "Subscriber ID Required" });
    }

    await db.query(
      `INSERT INTO pushalert_subscribers
        (fld_subscriber_id, fld_user_id, fld_member_id, fld_role, fld_name, fld_email, fld_mobile, fld_branch_id, fld_source, fld_is_active, fld_last_seen)
       VALUES (?,?,?,?,?,?,?,?,?,1,NOW())
       ON DUPLICATE KEY UPDATE
        fld_user_id=VALUES(fld_user_id),
        fld_member_id=VALUES(fld_member_id),
        fld_role=VALUES(fld_role),
        fld_name=VALUES(fld_name),
        fld_email=VALUES(fld_email),
        fld_mobile=VALUES(fld_mobile),
        fld_branch_id=VALUES(fld_branch_id),
        fld_source=VALUES(fld_source),
        fld_is_active=1,
        fld_last_seen=NOW()`,
      [subscriberId, userId || null, memberId || null, role || null, name || null, email || null, mobile || null, branchId || null, source || null],
    );

    res.json({ success: true, message: "Subscriber Saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Subscriber Save Failed" });
  }
});
```

## 3. Send To One Member

Use PushAlert v2 endpoint for personalized sending because it accepts `subscriber` / `subscribers`.

```js
function postPushAlertV2(payload) {
  return new Promise((resolve, reject) => {
    const apiUrl = process.env.PUSHALERT_API_URL || "https://api.pushalert.co/rest/v2/send";
    const apiKey = process.env.PUSHALERT_API_KEY;
    if (!apiKey) return reject(new Error("PUSHALERT_API_KEY missing"));

    const params = new URLSearchParams({
      title: payload.title,
      message: payload.message,
      url: payload.url,
      icon: payload.icon || "",
    });

    if (payload.subscriber) params.append("subscriber", payload.subscriber);
    if (payload.subscribers?.length) {
      params.append("subscribers", JSON.stringify(payload.subscribers));
    }
    if (payload.attributes) {
      params.append("attributes", JSON.stringify(payload.attributes));
    }

    const body = params.toString();
    const parsedUrl = new URL(apiUrl);
    const request = https.request(
      {
        hostname: parsedUrl.hostname,
        path: `${parsedUrl.pathname}${parsedUrl.search}`,
        method: "POST",
        headers: {
          Authorization: `api_key=${apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (response) => {
        let data = "";
        response.on("data", (chunk) => { data += chunk; });
        response.on("end", () => resolve({ statusCode: response.statusCode, body: data }));
      },
    );
    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

router.post("/SendMemberNotification", async (req, res) => {
  try {
    const { memberId, title, message, url } = req.body;
    if (!memberId || !title || !message) {
      return res.status(400).json({ success: false, message: "Member, title and message required" });
    }

    const [rows] = await db.query(
      `SELECT fld_subscriber_id
       FROM pushalert_subscribers
       WHERE fld_member_id=? AND fld_is_active=1`,
      [memberId],
    );

    const subscribers = rows.map((row) => row.fld_subscriber_id).filter(Boolean);
    if (!subscribers.length) {
      return res.status(404).json({ success: false, message: "Member has no PushAlert subscriber" });
    }

    const result = await postPushAlertV2({
      title,
      message,
      url: url || `${process.env.FRONTEND_URL}/members/dashboard`,
      icon: `${process.env.FRONTEND_URL}/logo192.png`,
      subscribers,
    });

    res.json({ success: true, message: "Notification Sent", subscribers: subscribers.length, pushalert: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message || "Notification Failed" });
  }
});
```

## 4. Frontend Flow

Frontend file added:

```txt
src/helpers/pushAlertPersonalization.js
```

It runs after login and on app load. It tries to save the PushAlert subscriber ID when available, and also attaches PushAlert attributes:

```js
user_id
member_id
role
name
branch_id
```

If PushAlert dashboard documentation gives an explicit callback for subscriber ID, call this from that callback:

```js
window.trainHighSavePushAlertSubscriber(subscriberId);
```

## 5. Testing

1. Login as a member on iOS/Chrome/Edge.
2. Allow notifications.
3. Confirm `pushalert_subscribers` has a row for that member.
4. Call:

```http
POST /pushalert/SendMemberNotification
```

```json
{
  "memberId": 1,
  "title": "Your class starts soon",
  "message": "Yoga starts at 7:00 AM today.",
  "url": "https://trainhighgym.com/members/classes"
}
```
