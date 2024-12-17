"use strict";
// INDEX
// 等待 DOM 完全加載後執行
document.addEventListener("DOMContentLoaded", function () {
  // 選取各元素
  const topElement = document.querySelector(".top");
  const winterBottom = document.getElementById("winterbottom");
  const titleliaElements = document.querySelectorAll(".titlelia");
  const seasonLogo = document.querySelector(".seasonlogo");

  // 儲存初始高度與位置
  const topElementHeight = topElement.offsetHeight || 0;
  const initialWinterBottomTop =
    parseInt(window.getComputedStyle(winterBottom).top, 10) || 0;

  // 儲存 keyframes 初始值
  const styleSheets = Array.from(document.styleSheets);
  let initialKeyframes = {}; // 用來儲存 keyframes 的初始 top 值

  styleSheets.forEach((sheet) => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      rules.forEach((rule) => {
        if (
          rule.type === CSSRule.KEYFRAMES_RULE &&
          /^(a|b|c|d|e)$/.test(rule.name)
        ) {
          initialKeyframes[rule.name] = {};
          Array.from(rule.cssRules).forEach((keyframe) => {
            if (keyframe.keyText === "0%" || keyframe.keyText === "100%") {
              const topValue = parseInt(keyframe.style.top, 10) || 0;
              initialKeyframes[rule.name][keyframe.keyText] = topValue; // 儲存原始值
            }
          });
        }
      });
    } catch (e) {
      console.error("Error accessing keyframes:", e);
    }
  });

  // 更新 keyframes 的 top 值
  function updateKeyframes(delta) {
    styleSheets.forEach((sheet) => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule) => {
          if (
            rule.type === CSSRule.KEYFRAMES_RULE &&
            initialKeyframes[rule.name]
          ) {
            Array.from(rule.cssRules).forEach((keyframe) => {
              if (keyframe.keyText === "0%" || keyframe.keyText === "100%") {
                const initialTop =
                  initialKeyframes[rule.name][keyframe.keyText];
                if (initialTop !== undefined) {
                  keyframe.style.top = `${initialTop + delta}px`;
                }
              }
            });
          }
        });
      } catch (e) {
        console.error("Error updating keyframes:", e);
      }
    });
  }

  // 隱藏 topElement 並更新樣式
  titleliaElements.forEach((titlelia) => {
    titlelia.addEventListener("click", function () {
      if (topElement) {
        topElement.classList.add("displaynone");
      }
      if (winterBottom) {
        winterBottom.style.top = `${
          initialWinterBottomTop - topElementHeight
        }px`;
      }
      updateKeyframes(-topElementHeight); // 將 keyframes 的 top 減少
    });
  });

  // 恢復 topElement 並還原樣式
  if (seasonLogo) {
    seasonLogo.addEventListener("click", function () {
      if (topElement) {
        topElement.classList.remove("displaynone");
      }
      if (winterBottom) {
        winterBottom.style.top = `${initialWinterBottomTop}px`;
      }
      updateKeyframes(0); // 將 keyframes 的 top 還原
    });
  }
});

// CHAPTERS
document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("iframebig");

  if (iframe) {
    iframe.addEventListener("load", function () {
      // 每次 iframe 跳轉頁面時滾動至頂
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// AUTHOR
document.addEventListener("DOMContentLoaded", () => {
  // 遍歷所有 img 元素
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // 提取 class 數字，若無法提取則跳過
    const match = img.className.match(
      /\b(one|two|three|four|five|six|seven|nine)\b/
    );
    if (!match) return;

    // 獲取 class 的數字對應的照片庫張數
    const photoCount = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      nine: 9,
    }[match[0]];

    // 初始化點擊次數
    let clickCount = 0;

    // 設置點擊事件處理
    img.addEventListener("click", () => {
      if (photoCount === 1) {
        // 若照片庫只有一張，無需更改
        return;
      }

      // 計算下一張照片的序號
      const baseSrc = img.src.replace(/-\d+\.jpg$/, ""); // 去掉 "-N.jpg" 部分
      clickCount = (clickCount + 1) % photoCount; // 循環計算
      const nextSrc = `${baseSrc}-${clickCount + 1}.jpg`;

      // 更改圖片的 src
      img.src = nextSrc;
    });
  });
});

/*
// Selecting elements
//const imgOne = document.querySelector(".one");
const imgTwo = document.getElementsByClassName("two");
const imgThree = document.getElementsByClassName("three");
const imgFour = document.getElementsByClassName("four");
const imgFive = document.getElementsByClassName("five");
const imgSix = document.getElementsByClassName("six");
const imgSeven = document.getElementsByClassName("seven");
const imgEight = document.getElementsByClassName("eight");
const imgNine = document.getElementsByClassName("nine");

imgTwo.addEventListener("click", function () {
  document.getElementById("demo").innerHTML = "Hello World";
});
// 2. x 是多少最多就到 -x，到 -x 的下一步就要再換回沒有-x 的
*/
