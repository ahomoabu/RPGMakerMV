//=============================================================================
// MapNameWindow.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/01/01 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc MapNameWindowPlugin
 * @author triacontane
 *
 * @param PositionX
 * @desc X座標を指定する場合は入力してください。
 * @default
 *
 * @param PositionY
 * @desc Y座標を指定する場合は入力してください。
 * @default
 *
 * @param Width
 * @desc 横幅を指定する場合は入力してください。
 * @default
 *
 * @help マップ名表示をウィンドウ化します。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc マップ名のウィンドウ化プラグイン
 * @author トリアコンタン
 *
 * @param X座標
 * @desc X座標を指定する場合は入力してください。
 * @default
 *
 * @param Y座標
 * @desc Y座標を指定する場合は入力してください。
 * @default
 *
 * @param 横幅
 * @desc 横幅を指定する場合は入力してください。
 * @default
 *
 * @help マップ名表示をウィンドウ化します。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    const pluginName = 'MapNameWindow';

    //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    const getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (let i = 0; i < paramNames.length; i++) {
            const name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    const getParamNumber = function(paramNames, min, max) {
        const value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseFloat(value, 10) || 0).clamp(min, max);
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    const param     = {};
    param.positionX = getParamNumber(['PositionX', 'X座標']);
    param.positionY = getParamNumber(['PositionY', 'Y座標']);
    param.width     = getParamNumber(['Width', '横幅']);

    const _Window_MapName_initialize    = Window_MapName.prototype.initialize;
    Window_MapName.prototype.initialize = function() {
        _Window_MapName_initialize.apply(this, arguments);
        if (param.positionX) this.x = param.positionX;
        if (param.positionY) this.y = param.positionY;
    };

    const _Window_MapName_updateFadeIn    = Window_MapName.prototype.updateFadeIn;
    Window_MapName.prototype.updateFadeIn = function() {
        _Window_MapName_updateFadeIn.apply(this, arguments);
        this.opacity = this.contentsOpacity;
    };

    const _Window_MapName_updateFadeOut    = Window_MapName.prototype.updateFadeOut;
    Window_MapName.prototype.updateFadeOut = function() {
        _Window_MapName_updateFadeOut.apply(this, arguments);
        this.opacity = this.contentsOpacity;
    };

    Window_MapName.prototype.drawBackground = function(x, y, width, height) {};

    const _Window_MapName_windowWidth = Window_MapName.prototype.windowWidth;
    Window_MapName.prototype.windowWidth = function() {
        return param.width ? param.width : _Window_MapName_windowWidth.apply(this, arguments);
    };
})();

