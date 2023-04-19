/**
 * 时间api封装
 * @constructor
 */
function TimeWrapper() {

}

var MaNongTime = new TimeWrapper();

/**
 *
 * 运行开始时间
 * <Br/>
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 4.4 以上
 *
 *
 *
 * @return string 开始时间
 */

TimeWrapper.prototype.sTime = function (stepn) {
    console.time("耗时");
    return logd("-运行开始时间-"+stepn+"："+timeFormat("yyyy-MM-dd HH:mm:ss"));
};

/**
 *
 * 运行耗时
 * <Br/>
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 4.4 以上
 *
 *
 *
 * @return string 运行耗时
 */

TimeWrapper.prototype.eTime = function (stepn) {
    let uTime = console.timeEnd("耗时")
    return logd("-运行消耗时间-"+stepn+"："+timeFormat("yyyy-MM-dd HH:mm:ss") + "," + uTime + "毫秒");
};
