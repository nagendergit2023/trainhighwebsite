export const getMemberId = (user = {}) =>
  user?.memberId || user?.member_id || user?.fld_member_id || user?.fld_id || user?.id;

export const getStoredBookings = (memberId) => {
  if (!memberId) return [];
  try {
    return JSON.parse(localStorage.getItem(`member_batch_bookings_${memberId}`) || "[]");
  } catch {
    return [];
  }
};

export const saveStoredBooking = (memberId, batch, bookingDate) => {
  if (!memberId || !batch) return;
  const batchId = batch.fld_id || batch.id;
  const selectedDate = bookingDate || new Date().toISOString().slice(0, 10);
  const existing = getStoredBookings(memberId).filter(
    (item) =>
      !(
        String(item.batchId) === String(batchId) &&
        String(item.bookingDate) === String(selectedDate)
      ),
  );
  const booking = {
    batchId,
    batchMemberId: batch.batchMemberId || null,
    batchName: batch.fld_batch_name || batch.batchName || "Class",
    roomName: batch.fld_room_name || batch.roomName || "Studio",
    trainer: batch.trainers || batch.trainer_names || "Not Assigned",
    days: batch.days || "",
    startTime: batch.startTime || "",
    endTime: batch.endTime || "",
    bookingDate: selectedDate,
    status: "Booked",
    paymentStatus: "Paid",
  };
  localStorage.setItem(
    `member_batch_bookings_${memberId}`,
    JSON.stringify([booking, ...existing]),
  );
};

export const getStoredReviews = (memberId) => {
  if (!memberId) return [];
  try {
    return JSON.parse(localStorage.getItem(`member_batch_reviews_${memberId}`) || "[]");
  } catch {
    return [];
  }
};

export const saveStoredReview = (memberId, review) => {
  if (!memberId || !review) return;
  const existing = getStoredReviews(memberId).filter(
    (item) =>
      !(
        String(item.batchId) === String(review.batchId) &&
        String(item.bookingDate || "") === String(review.bookingDate || "")
      ),
  );
  localStorage.setItem(
    `member_batch_reviews_${memberId}`,
    JSON.stringify([{ ...review, createdAt: new Date().toISOString() }, ...existing]),
  );
};


