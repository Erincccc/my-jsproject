# Breakout! Game

JS实现breakout！游戏，使用HTML5 canvas element.游戏中，用方向键控制球拍，将球弹起以击碎砖块。击碎砖块积一分，触地结束游戏，积分归0。

- Draw elements on canvas
- Use canvas paths to draw shapes
- Add animation with requestAnimationFrame(cb)
- Move paddle on arrow key press
- Add collision detection
- Keep score
- Add rules button with slider

# New Breakout! Game

在Breakout! Game的基础上，基于vue3进行组件化编程，使用tailwindCSS+daisyUI处理CSS样式

![image-20230803094013102](D:\文件\work\js-project\my-jsproject\img\image-20230803094013102.png)

- 增加输入框组件，在开始游戏前记录玩家姓名

  ![image-20230803094041565](D:\文件\work\js-project\my-jsproject\img\image-20230803094041565-16910268435412.png)

- 增加游戏结束框组件，在游戏结束（小球触地或砖块消失）后弹出游戏结束框，记录玩家分数。

  ![image-20230803094108872](D:\文件\work\js-project\my-jsproject\img\image-20230803094108872-16910268704083.png)

- 增加排行榜组件，记录玩家分数并进行排名。

  ![image-20230803094421605](D:\文件\work\js-project\my-jsproject\img\image-20230803094421605-16910270627794.png)



