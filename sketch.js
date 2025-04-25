let circles = []; // 儲存星星的資料
let colors = ['#E9D66B', '#FFBF00', '#FFD700', '#F8DE7E', '#ED9121', '#E25822']; // 指定顏色列表
let iframe; // 用於嵌入網頁的 iframe
let subMenu; // 子選單
let showHeart = false; // 用於控制心型的顯示狀態

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  frameRate(1); // 設定每秒繪製一次

  // 預先生成 40 個星星的資料
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width), // 隨機 X 座標
      y: random(height), // 隨機 Y 座標
      baseSize: random(30, 100), // 隨機基礎大小
      color: random(colors) // 從顏色列表中隨機抽取
    });
  }

  // 建立 iframe
  iframe = createElement('iframe');
  iframe.style('position', 'absolute');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('background-color', 'rgba(255, 255, 255, 0.2)'); // 設定背景透明度
  iframe.hide(); // 預設隱藏 iframe

  // 建立選單
  let menu = createElement('ul');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '10px');
  menu.style('list-style', 'none');
  menu.style('margin', '0');
  menu.style('padding', '0');
  menu.style('display', 'flex');
  menu.style('gap', '15px');
  menu.style('background-color', '#F7E7CE'); // 設定選單背景顏色

  // 選單項目
  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li');
    let link = createA('#', item);
    link.style('text-decoration', 'none');
    link.style('color', '#000000'); // 設定文字顏色
    link.style('font-size', '24px'); // 設定文字大小
    link.style('font-family', 'Microsoft JhengHei, sans-serif'); // 設定字型為微軟正黑體
    link.style('padding', '10px 15px');
    link.style('border-radius', '5px');
    link.style('transition', 'background-color 0.3s, color 0.3s');
    link.mouseOver(() => link.style('background-color', '#FF7538')); // 滑鼠懸停時背景顏色
    link.mouseOut(() => link.style('background-color', 'transparent')); // 滑鼠移開時背景顏色
    li.child(link);

    // 通用邏輯：移除自我介紹的文字
    link.mousePressed(() => {
      let existingText = select('#introText');
      if (existingText) existingText.remove();
    });

    // 如果是「首頁」
    if (item === '首頁') {
      link.mousePressed(() => {
        // 切換心型的顯示狀態
        showHeart = !showHeart;

        // 隱藏 iframe
        iframe.hide();

        // 隱藏子選單（如果有）
        if (subMenu) subMenu.hide();

        // 移除其他內容（如果有）
        let existingIntroText = select('#introText');
        if (existingIntroText) existingIntroText.remove();
        let existingQuizText = select('#quizText');
        if (existingQuizText) existingQuizText.remove();
        let existingQuizOptions = select('#quizOptions');
        if (existingQuizOptions) existingQuizOptions.remove();
        let existingFeedback = select('#feedback');
        if (existingFeedback) existingFeedback.remove();

        // 重新繪製畫布
        redraw();
      });
    }

    // 如果是「自我介紹」
    if (item === '自我介紹') {
      link.mousePressed(() => {
        // 確保心型消失
        showHeart = false;

        iframe.hide(); // 隱藏 iframe
        if (subMenu) subMenu.hide(); // 隱藏子選單

        // 顯示打字效果的文字
        let typingText = "陳宥寧，19y淡江大學教育科技學系";
        let displayText = "";
        let index = 0;

        // 建立新的文字元素
        let introText = createP("").id('introText');
        introText.style('position', 'absolute');
        introText.style('top', '50%');
        introText.style('left', '50%');
        introText.style('transform', 'translate(-50%, -50%)');
        introText.style('font-size', '24px');
        introText.style('font-family', 'Microsoft JhengHei, sans-serif');
        introText.style('color', '#000000');
        introText.style('background-color', '#F7E7CE');
        introText.style('padding', '20px');
        introText.style('border-radius', '10px');
        introText.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');

        // 打字效果
        let typingInterval = setInterval(() => {
          if (index < typingText.length) {
            displayText += typingText[index];
            introText.html(displayText);
            index++;
          } else {
            clearInterval(typingInterval); // 停止定時器
          }
        }, 100); // 每 100 毫秒顯示一個字
      });
    }

    // 如果是「作品集」
    if (item === '作品集') {
      subMenu = createElement('ul');
      subMenu.style('list-style', 'none');
      subMenu.style('margin', '0');
      subMenu.style('padding', '20px');
      subMenu.style('position', 'fixed'); // 全螢幕顯示
      subMenu.style('top', '50%'); // 子選單顯示在畫面正中間
      subMenu.style('left', '50%');
      subMenu.style('transform', 'translate(-50%, -50%)'); // 置中
      subMenu.style('background-color', '#F7E7CE');
      subMenu.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
      subMenu.style('border-radius', '10px');
      subMenu.style('display', 'none'); // 預設隱藏子選單

      let subItems = [
        { name: '第一周', link: 'https://hackmd.io/@youning/rys_4IB5Jl' },
        { name: '第二周', link: 'https://hackmd.io/@youning/BJiUBW80Jx' },
        { name: '第三周', link: 'https://hackmd.io/@youning/S1qttOXTJx' },
        { name: '第四周', link: 'https://hackmd.io/@youning/H1m1IZIRJe' }
      ];

      for (let subItem of subItems) {
        let subLi = createElement('li');
        let subLink = createA('#', subItem.name);
        subLink.style('text-decoration', 'none');
        subLink.style('color', '#000000');
        subLink.style('font-size', '20px');
        subLink.style('padding', '10px 20px');
        subLink.style('border-radius', '5px');
        subLink.style('transition', 'background-color 0.3s, color 0.3s');
        subLink.mouseOver(() => subLink.style('background-color', '#FF7538'));
        subLink.mouseOut(() => subLink.style('background-color', 'transparent'));
        subLink.mousePressed(() => {
          iframe.attribute('src', subItem.link); // 設定 iframe 的連結
          iframe.show(); // 顯示 iframe
          subMenu.hide(); // 當 iframe 顯示時，隱藏子選單
        });
        subLi.child(subLink);
        subMenu.child(subLi);
      }

      li.mousePressed(() => {
        // 點擊「作品集」時顯示/隱藏子選單
        subMenu.style('display', subMenu.style('display') === 'none' ? 'block' : 'none');
      });

      li.child(subMenu);
    }

    // 如果是「測驗卷」
    if (item === '測驗卷') {
      link.mousePressed(() => {
        // 確保心型消失
        showHeart = false;

        iframe.hide(); // 隱藏 iframe
        if (subMenu) subMenu.hide(); // 隱藏子選單

        // 顯示打字效果的問題
        let typingText = "我喜歡甚麼動物?";
        let displayText = "";
        let index = 0;

        // 移除之前的文字和選項（如果有）
        let existingText = select('#quizText');
        if (existingText) existingText.remove();
        let existingOptions = select('#quizOptions');
        if (existingOptions) existingOptions.remove();

        // 建立新的文字元素
        let quizText = createP("").id('quizText');
        quizText.style('position', 'absolute');
        quizText.style('top', '30%');
        quizText.style('left', '50%');
        quizText.style('transform', 'translate(-50%, -50%)');
        quizText.style('font-size', '24px');
        quizText.style('font-family', 'Microsoft JhengHei, sans-serif');
        quizText.style('color', '#000000');
        quizText.style('background-color', '#F7E7CE');
        quizText.style('padding', '20px');
        quizText.style('border-radius', '10px');
        quizText.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');

        // 打字效果
        let typingInterval = setInterval(() => {
          if (index < typingText.length) {
            displayText += typingText[index];
            quizText.html(displayText);
            index++;
          } else {
            clearInterval(typingInterval); // 停止定時器
            showOptions(); // 顯示選項
          }
        }, 100); // 每 100 毫秒顯示一個字

        // 顯示選項
        function showOptions() {
          let options = ['狗', '貓', '鳥', '鱷魚'];
          let quizOptions = createDiv().id('quizOptions');
          quizOptions.style('position', 'absolute');
          quizOptions.style('top', '50%');
          quizOptions.style('left', '50%');
          quizOptions.style('transform', 'translate(-50%, -50%)');
          quizOptions.style('display', 'flex');
          quizOptions.style('gap', '15px');

          options.forEach(option => {
            let optionButton = createButton(option);
            optionButton.style('padding', '10px 20px');
            optionButton.style('font-size', '18px');
            optionButton.style('font-family', 'Microsoft JhengHei, sans-serif');
            optionButton.style('border', '2px solid #000000');
            optionButton.style('border-radius', '5px');
            optionButton.style('background-color', '#F7E7CE');
            optionButton.style('cursor', 'pointer');
            optionButton.mousePressed(() => handleAnswer(option));
            quizOptions.child(optionButton);
          });
        }

        // 處理答案
        function handleAnswer(selectedOption) {
          // 移除之前的回饋（如果有）
          let existingFeedback = select('#feedback');
          if (existingFeedback) existingFeedback.remove();

          // 建立回饋元素
          let feedback = createDiv().id('feedback');
          feedback.style('position', 'absolute');
          feedback.style('top', '70%');
          feedback.style('left', '50%');
          feedback.style('transform', 'translate(-50%, -50%)');
          feedback.style('font-size', '48px');
          feedback.style('font-family', 'Microsoft JhengHei, sans-serif');
          feedback.style('font-weight', 'bold');

          if (selectedOption === '鱷魚') {
            feedback.html('⭕'); // 綠色圈圈
            feedback.style('color', 'green');
          } else {
            feedback.html('❌'); // 紅色叉叉
            feedback.style('color', 'red');
          }
        }
      });
    }

    // 如果是「教學影片」
    if (item === '教學影片') {
      link.mousePressed(() => {
        // 確保心型消失
        showHeart = false;

        // 設定 iframe 的連結
        iframe.attribute('src', 'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/A2/week1/20250221_092037.mp4');
        iframe.style('display', 'block'); // 顯示 iframe
        iframe.style('width', '80%'); // 設定 iframe 寬度
        iframe.style('height', '80%'); // 設定 iframe 高度
        iframe.style('position', 'absolute'); // 置中顯示
        iframe.style('top', '50%');
        iframe.style('left', '50%');
        iframe.style('transform', 'translate(-50%, -50%)');
        iframe.style('border', 'none'); // 移除邊框
        iframe.show(); // 顯示 iframe

        // 隱藏其他內容（如果有）
        if (subMenu) subMenu.hide(); // 隱藏子選單
        let existingIntroText = select('#introText');
        if (existingIntroText) existingIntroText.remove();
        let existingQuizText = select('#quizText');
        if (existingQuizText) existingQuizText.remove();
        let existingQuizOptions = select('#quizOptions');
        if (existingQuizOptions) existingQuizOptions.remove();
        let existingFeedback = select('#feedback');
        if (existingFeedback) existingFeedback.remove();
      });
    }

    menu.child(li);
  }
}

function draw() {
  background('#fefae0'); // 背景顏色

  // 繪製所有星星
  for (let circle of circles) {
    let randomFactor = random(0.8, 1.2); // 隨機變化因子
    let size = map(mouseX, 0, width, 10, 120) * (circle.baseSize / 100) * randomFactor; // 根據滑鼠 X 座標調整大小
    fill(circle.color);
    noStroke();
    drawStar(circle.x, circle.y, size, size / 2, 5); // 繪製星星
  }

  // 如果 showHeart 為 true，繪製心型和對話框
  if (showHeart) {
    drawHeartWithDialog();
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawHeartWithDialog() {
  // 繪製心型
  push();
  translate(width / 2, height / 2); // 將心型置於畫布中央
  fill('#FF6F61'); // 心型顏色
  noStroke();
  beginShape();
  vertex(0, -50);
  bezierVertex(-50, -100, -150, -50, 0, 100);
  bezierVertex(150, -50, 50, -100, 0, -50);
  endShape(CLOSE);

  // 繪製眼睛
  fill(0); // 黑色眼睛
  ellipse(-30, -20, 10, 10); // 左眼
  ellipse(30, -20, 10, 10); // 右眼
  pop();

  // 繪製對話框
  let dialogX = width / 2 + 100; // 對話框位置
  let dialogY = height / 2 - 50;
  fill('#FFFFFF'); // 對話框背景顏色
  stroke(0); // 對話框邊框顏色
  rect(dialogX, dialogY, 100, 50, 10); // 繪製圓角矩形
  fill(0); // 對話框文字顏色
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text('你好', dialogX + 50, dialogY + 25); // 對話框文字
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}