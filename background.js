// تخزين أوقات آخر استخدام للتبويبات
let tabsLastAccessed = {};

// عندما يقوم المستخدم بتبديل التبويبات
chrome.tabs.onActivated.addListener((activeInfo) => {
  const currentTabId = activeInfo.tabId;
  const currentTime = Date.now();
  
  // تحديث وقت النشاط للتبويب الحالي
  tabsLastAccessed[currentTabId] = currentTime;
  console.log(`Tab ${currentTabId} is now active. Time updated.`);
});

// تنظيف البيانات عندما يتم إغلاق تبويب تماماً
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabsLastAccessed[tabId];
});

// إعداد مؤقت يعمل كل دقيقة للتحقق من التبويبات (سنستخدمه لاحقاً للتعليق التلقائي)
chrome.alarms.create("checkIdleTabs", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkIdleTabs") {
    console.log("Checking for idle tabs...");
    // هنا سنضع لاحقاً كود الأوضاع (Balanced, Aggressive, etc.)
  }
});