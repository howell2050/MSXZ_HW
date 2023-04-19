function Jsd() {
}
var ss=new Jsd();

/**
 *
 * 找图点击
 * <Br/>
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 4.4 以上
 *
 * @param picname 模板图
 * @param ck 是否点击
 * @param wt 点击前等待
 * @param wht 弱阈值
 *
 * @return boolean 布尔值
 */

Jsd.prototype.findpicclick= function (picname,ck,wt,wth) {
    let sms = readResAutoImage(picname+".png");
    let aimage = image.captureFullScreen();
    if(wth == null){
        wth = 0.91
    }
    if (aimage != null) {
        let points = image.findImage(aimage, sms, 0, 0, 0, 0, wth, 0.95, 1, 5);
        if(points && points.length > 0){
            logd(points)
            if (ck == 1) {
                sleep(wt)
                if(clickCenter(points[0])){
                    logd("点击-"+picname+"-成功-坐标");
                    image.recycle(sms)
                    image.recycle(aimage)
                    return true
                }else {
                    logd("点击-"+picname+"-失败-坐标");
                    image.recycle(sms)
                    image.recycle(aimage)
                    return false
                }
            }else{
                logd("找图-"+picname+"成功");
                image.recycle(sms)
                image.recycle(aimage)
                return true
            }
        }else {
            logd("找图-"+picname+"-失败");
            image.recycle(sms)
            image.recycle(aimage)
            return false
        }
    }else {
        logd("全屏截图-失败");
        image.recycle(sms)
        image.recycle(aimage)
        return false
    }
}

/**
 *
 * 自定义点击操作，按下和弹起
 * <Br/>
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 4.4 以上
 *
 * @param x 横坐标
 * @param y 纵坐标
 * @param wt 点击前等待
 *
 * @return boolean 布尔值
 */

Jsd.prototype.ManClickPoint = function (x,y,wt) {
    let result = touchDown(x,y);
    if (result){
        logd("按下成功");
    }else {
        logd("按下失败");
        return false;
    }
    sleep(wt)
    result = touchUp(x,y);
    if (result){
        logd("弹起成功");
        return true;
    }else {
        logd("弹起失败");
        return false;
    }
}

/**
 *
 * 适应分辨率
 * <Br/>
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 4.4 以上
 *
 * @param x 起始范围x
 * @param y 起始范围y
 * @param zx 起始范围x1
 * @param y1 起始始范围y1
 *
 * @return 返回适应后的坐标
 */

Jsd.prototype.RectOffset = function (x,y,zx,zy,xm,ym) {
    let rectp= new Rect();
    rectp.left=x*xm;
    rectp.top=y*ym;
    rectp.right=zx*xm;
    rectp.bottom=y*ym;
    return rectp;
}