import PostApiCall from "./PostApi";
import { getMemberId } from "./batchMemberStorage";

const SYNC_FLAG_PREFIX = "pushalert_subscriber_synced_";
const SUBSCRIBER_KEY = "pushalert_subscriber_id";

const getUserId = (user = {}) =>
  user?.userId || user?.user_id || user?.fld_user_id || user?.staffId || user?.fld_id || user?.id;

const cleanValue = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (typeof value === "object") {
    return (
      value.subscriber ||
      value.subscriber_id ||
      value.subscriberId ||
      value.subs_id ||
      value.id ||
      value.sid ||
      ""
    ).toString().trim();
  }
  return "";
};

const readLikelyStoredSubscriberId = () => {
  const direct = localStorage.getItem(SUBSCRIBER_KEY);
  if (direct) return direct;

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index) || "";
    if (!/pushalert|subscriber|subs/i.test(key)) continue;
    const value = localStorage.getItem(key) || "";
    if (!value || value.length > 180) continue;
    if (/^[a-z0-9_-]{8,}$/i.test(value)) return value;
  }

  const cookieMatch = document.cookie.match(
    /(?:^|;\s*)(?:pushalert_subscriber_id|pa_subscriber_id|pa_subs_id)=([^;]+)/i,
  );
  return cookieMatch ? decodeURIComponent(cookieMatch[1]) : "";
};

const buildSubscriberPayload = (user, subscriberId, source) => ({
  subscriberId,
  userId: getUserId(user) || null,
  memberId: getMemberId(user) || null,
  role: user?.role || user?.fld_role || "",
  name: user?.name || user?.fld_name || user?.memberName || "",
  email: user?.email || user?.fld_email || "",
  mobile: user?.mobile || user?.mobileNumber || user?.fld_mobile_number || "",
  branchId: user?.branch_id || user?.fld_branch_id || "",
  source,
});

const saveSubscriberToApi = async (user, rawSubscriberId, source = "pushalert") => {
  const subscriberId = cleanValue(rawSubscriberId);
  if (!subscriberId || !getUserId(user)) return false;

  const syncKey = `${SYNC_FLAG_PREFIX}${getUserId(user)}_${subscriberId}`;
  if (sessionStorage.getItem(syncKey)) return true;

  const res = await PostApiCall.postRequest(
    buildSubscriberPayload(user, subscriberId, source),
    "pushalert/SaveSubscriber",
  );

  if (res?.status === 200 || res?.status === 201) {
    localStorage.setItem(SUBSCRIBER_KEY, subscriberId);
    sessionStorage.setItem(syncKey, "1");
    return true;
  }

  return false;
};

const pushCommand = (command) => {
  window.PushAlertCo = window.PushAlertCo || [];
  if (Array.isArray(window.PushAlertCo)) window.PushAlertCo.push(command);
};

export const syncPushAlertSubscriber = (user) => {
  if (typeof window === "undefined" || !user || !getUserId(user)) return;

  window.trainHighSavePushAlertSubscriber = (subscriber) => {
    saveSubscriberToApi(user, subscriber, "callback").catch(() => {});
  };

  const attributes = {
    user_id: String(getUserId(user) || ""),
    member_id: String(getMemberId(user) || ""),
    role: String(user?.role || user?.fld_role || ""),
    name: String(user?.name || user?.fld_name || user?.memberName || ""),
    branch_id: String(user?.branch_id || user?.fld_branch_id || ""),
  };

  pushCommand(["associateID", String(getUserId(user))]);
  pushCommand(["addAttributes", attributes]);
  pushCommand(["onSuccess", window.trainHighSavePushAlertSubscriber]);
  pushCommand(["onSubscribe", window.trainHighSavePushAlertSubscriber]);
  pushCommand(["onSubscribed", window.trainHighSavePushAlertSubscriber]);

  const storedSubscriberId = readLikelyStoredSubscriberId();
  if (storedSubscriberId) {
    saveSubscriberToApi(user, storedSubscriberId, "storage").catch(() => {});
  }
};

export const syncLoggedInPushAlertSubscriber = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    syncPushAlertSubscriber(user);
  } catch {}
};
