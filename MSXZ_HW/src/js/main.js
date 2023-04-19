/**
 * 常用JS变量:
 * agentEvent = 代理模式下自动点击模块
 * acEvent= 无障碍模式下自动点击模块
 * device = 设备信息模块
 * file = 文件处理模块
 * http = HTTP网络请求模块
 * shell = shell命令模块
 * thread= 多线程模块
 * image = 图色查找模块
 * utils= 工具类模块
 * global = 全局快捷方式模块
 * 常用java变量：
 *  context : Android的Context对象
 *  javaLoader : java的类加载器对象
 * 导入Java类或者包：
 *  importClass(类名) = 导入java类
 *      例如: importClass(java.io.File) 导入java的 File 类
 *  importPackage(包名) =导入java包名下的所有类
 *      例如: importPackage(java.util) 导入java.util下的类
 *
 */

function main() {
    var request = image.requestScreenCapture(10000, 0)
    if (request) {
        logd("申请成功");
    } else {
        logd("申请失败");
        exit();
    }
    var d = image.initOpenCV();
    logd(d);


    utils.openAppByName("美团")
    sleep(8000)
    logd("分辨率："+device.getScreenWidth()+"*"+device.getScreenHeight());
    let AdapterWidth = 1440
    let AdapterHeight = 2880
    let CurrentWidth = device.getScreenWidth()
    let CurrentHeight = device.getScreenHeight()
    let xm = CurrentWidth / AdapterWidth
    let ym = CurrentHeight / AdapterHeight
    let rectp= new Rect();
    let x = 0;
    let y = 0;
    let x1 = 5;
    let y1 = 5;
    rectp.left = x;
    rectp.top = y;
    rectp.right = x1;
    rectp.bottom = y1;

    let node = textMatch("切换到.*").depth(9).getOneNodeInfo(0)
    if (node) {
        node.click()
        logd("点击-" + JSON.stringify(node.text))
        sleep(1000)
    }

    node = desc("我的").depth(8).selected(false).getOneNodeInfo(0);
    if (node) {
        node.click()
        logd("点击-我的")
        sleep(2000);
    }

    ss.findpicclick("美食小镇",1,1000)

    每日签到()
    兑换中心()
    领奖励()

    let i = 0
    while(true) {
        if(ss.findpicclick("骰子用完",0,100,0.95)){
            sleep(1000)
            if(ss.findpicclick("获得骰子0",0,100,0.9)){
                sleep(1000)
                clickPoint(944,938)
                exit();
            }
            i=i+1
            if(i>3) {
                exit();
            }
        }

        if(骰子() || 免费骰子()){
            sleep(2000)
            continue
        }

        let startcap = image.captureScreen(3,x,y,x1,y1)
        let startcol = image.pixel(startcap,3,3)
        logd(startcol)

        //高效操作
        if(获得金库()){
            continue
        }
        if(获得奖励()){
            continue
        }
        if(打开盲盒()){
            continue
        }

        let matchs = image.matchTemplateEx( startcap,0.6,0.8,rectp,-1,1,5);
        let endcap = image.captureScreen(3,x,y,x1,y1)
        let endcol = image.pixel(endcap,3,3)
        logd(JSON.stringify(matchs[0].similarity));
        logd(endcol)
        sleep(1000)
        if(startcol == endcol) {
            低效操作()
        }
        image.recycle(startcap)
        image.recycle(endcap)
    }

    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    home();
}

function 每日签到() {
    if(ss.findpicclick("每日签到",1,100,0.8)) {
        sleep(3000)
        clickPoint(702, 1600)
        sleep(1000)
        clickPoint(702, 1600)
        sleep(10000)
        clickPoint(57, 150)
        sleep(1000)
        clickPoint(570, 1540)
        sleep(10000)
        clickPoint(62, 137)
        sleep(1000)
        clickPoint(525, 1597)
    }
}

function 兑换中心() {
    if(clickPoint(993,572)){
        sleep(2000)
        if(ss.findpicclick("兑换中心签到",1,100,0.8)) {
            logd("兑换中心签到")
            sleep(2000)
            clickPoint(525,1667)
            sleep(10000)
            clickPoint(55,150)
            sleep(2000)
            clickPoint(550,1450)
            sleep(1000)
            clickPoint(985,530)
        }
        sleep(1000)
    }
}

function 领奖励() {
    if(clickPoint(165,2035)){
        sleep(2000)
        领奖励:while(true) {
            if(ss.findpicclick("可领取", 1, 100, 0.9)){
                sleep(2000)
                clickPoint(555,1602)
                sleep(2000)
            }else{
                break 领奖励
            }
        }
        clickPoint(1000,620)
        sleep(1000)
    }
}

function 低效操作() {
    logd("低效操作")
    if(ss.findpicclick("解锁奖励100", 1,100) || ss.findpicclick("解锁奖励50", 1,1) || ss.findpicclick("领双倍红包", 1,1)){
        sleep(10000)
    }
    //返回
    clickPoint(60,143)
    clickPoint(66,226)

    ss.findpicclick("获得骰子", 1,500)
    ss.findpicclick("拜访", 1,100)
    ss.findpicclick("获得拜访", 1,100)
    ss.findpicclick("买一份", 1,100)
    ss.findpicclick("限时奖励", 1,100)
    //美图专属宝箱奖励，领取
    clickPoint(540,1510)

    ss.findpicclick("签到领钱返回", 1,10000)
    ss.findpicclick("退出签到领钱", 1,500)

    //金库
    clickPoint(345,1197)
    clickPoint(740,1202)
    clickPoint(305,1670)
    clickPoint(542,1602)

    //我知道了
    clickPoint(330,1660)
    //猜个杯子
    clickPoint(536,1373)
    clickPoint(966,560)

    ss.findpicclick("继续游戏", 1,100,0.8)
    //炸房子、占领房子、锤房子
    clickPoint(543,1950)
    //盲盒
    clickPoint(916,546)
    //盲盒，恭喜获得，确定
    clickPoint(553,1600)
    //返回，恭喜获得，确定
    clickPoint(540,1453)

    ss.findpicclick("拜访骰子",1,100)
    //关闭，签到领钱
    clickPoint(933,650)
    //签到领钱，返回
    if(ss.findpicclick("签到领钱返回",0,100)){
        back()
    }

    ss.findpicclick("再试一次", 1,500)

    返回骰子()
}

function 骰子() {
    let firstColor = ["#E82A20","#101010","#F53236","#101010","#BF090F","#101010","#EF2C2B","#101010"];
    let x = 535;
    let y = 1954;
    let ex = 550;
    let ey = 1964;
    let points = image.findColorEx(firstColor, 0.9, x, y, ex, ey, 1, 1);
    if (points && points.length > 0 && ss.findpicclick("骰子",0,10)) {
        if(clickPoint(points[0].x, points[0].y)){
            return true;
        }else{
            return false;
        }
    }else {
        return false;
    }
}

function 免费骰子() {
    let firstColor = ["#BF090F","#101010","#CF0C0B","#101010","#D0514D","#101010","#C50F0F","#101010"];
    let x = 533;
    let y = 1898;
    let ex = 545;
    let ey = 1903;
    let points = image.findColorEx(firstColor, 0.9, x, y, ex, ey, 1, 1);
    if (points && points.length > 0 && ss.findpicclick("免费骰子",0,10)) {
        if(clickPoint(points[0].x, points[0].y)){
            return true;
        }else{
            return false;
        }
    }else {
        return false;
    }
}

function 获得奖励() {
    if(ss.findpicclick("解锁奖励", 0,100)){
        sleep(10000);
        clickPoint(56,146);
        //确定();
    }else{
        return false;
    }
}

function 获得金库() {
    if(ss.findpicclick("金库1", 0,10)){
        sleep(500)
        clickPoint(345,1197)
        sleep(300)
        clickPoint(740,1202)
        sleep(300)
        clickPoint(305,1670)
        sleep(500)
        clickPoint(542,1602)
        return true;
    }else{
        return false;
    }
}

function 打开盲盒() {
    if (ss.findpicclick("盲盒", 0, 100)) {
        clickPoint(916,546)
        return true;
    } else {
        return false;
    }
}


function 确定() {
    if(ss.findpicclick("确定1", 1,100)){
        return true;
    }else if(ss.findpicclick("确定2", 1,100)){
        return true;
    }else if(ss.findpicclick("确定3", 1,100)){
        return true;
    }else{
        return false;
    }
}

function 拜访游戏() {
    if(ss.findpicclick("占领房子", 1,100)){
        return true;
    }else if(ss.findpicclick("炸房子", 1,100)){
        return true;
    }else if(ss.findpicclick("锤房子", 1,100)){
        return true;
    }else{
        return false;
    }
}

function 骰子游戏() {
    if(ss.findpicclick("盲盒", 1,100)){
        return true;
    }else if(ss.findpicclick("杯子", 1,100)){
        return true;
    }else if(ss.findpicclick("金库1", 1,1000)){
        return true;
    }else if(ss.findpicclick("金库2", 1,1000)){
        return true;
    }else if(ss.findpicclick("金库3", 1,1000)){
        return true;
    }else{
        return false;
    }
}

function 返回() {
    if(ss.findpicclick("返回1", 1,100)){
        return true;
    }else if(ss.findpicclick("返回2", 1,100)){
        return true;
    }else if(ss.findpicclick("返回3", 1,100)){
        return true;
    }else if(ss.findpicclick("返回4", 1,100)){
        return true;
    }else if(ss.findpicclick("返回5", 1,100)){
        return true;
    }else if(ss.findpicclick("返回6", 1,100)){
        clickPoint(67,132)
        return true;
    }else if(ss.findpicclick("返回-特价团购", 1,100)){
        return true;
    }else{
        return false;
    }
}

function 返回骰子() {
    let s=0
    返回骰子:while(true) {
        if(!ss.findpicclick("骰子",0,100,0.8) && !ss.findpicclick("免费骰子",0,100,0.8)){
            logd("返回找不到骰子")
            sleep(1000)
            back()
            sleep(1000)
            s=s+1
            if(s>10){
                break 返回骰子
            }
        }else{
            break 返回骰子
        }
    }
}

function 拜访() {
    if(ss.findpicclick("获得拜访", 1,100)){
        return true;
    }else{
        return false;
    }
}

function 获得骰子() {
    if(ss.findpicclick("获得骰子", 1,10000)){
        return true;
    }else{
        return false;
    }
}

function 关闭() {
    if(ss.findpicclick("关闭每日任务", 1,100)){
        return true;
    }else if(ss.findpicclick("关闭兑换奖励", 1,100)) {
        return true;
    }else {
        return false;
    }
}

function test() {
    while(false){
        sleep(1000);
        ss.findpicclick("兑换中心签到",1,100,0.85);
    }
}

function autoServiceStart(time) {
    for (var i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        var started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main();


