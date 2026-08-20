document.getElementById('discardBtn').addEventListener('click', async () => {
  const statusEl = document.getElementById('status');
  statusEl.innerText = "Processing...";

  try {
    // جلب جميع التبويبات المفتوحة في جميع النوافذ
    const allTabs = await chrome.tabs.query({});
    let discardedCount = 0;

    for (let tab of allTabs) {
      // شروط الإعفاء من التعليق:
      // 1. إذا كان التبويب نشطاً (مفتوح أمامك حالياً)
      // 2. إذا كان التبويب معلقاً بالفعل
      // 3. إذا كان التبويب يخرج صوتاً (مثل موسيقى أو فيديو يعمل)
      if (!tab.active && !tab.discarded && !tab.audible) {
        // نستخدم الـ API الرسمي والموثوق من جوجل لتعليق التبويب بأمان
        await chrome.tabs.discard(tab.id);
        discardedCount++;
      }
    }

    statusEl.innerText = `Success! Suspended ${discardedCount} tabs.`;
  } catch (error) {
    statusEl.innerText = "Error occurred.";
    console.error("Error:", error);
  }
});