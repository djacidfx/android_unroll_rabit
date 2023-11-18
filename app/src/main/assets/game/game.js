
function getJsonFromUrl() {
    for (var a = {}, b = location.search.substr(1).split("&"), c = 0; c < b.length; c++) {
        var d = b[c].indexOf("="),
            d = [b[c].substring(0, d), b[c].substring(d + 1)];
        a[d[0]] = decodeURIComponent(d[1])
    }
    return a
};
var GameSounds = function() {
    this.musicON = !0;
    this.musics = [];
    this.sounds = [];
    this.actualMusic = null
};
GameSounds.prototype = {
    constructor: GameSounds,
    create: function() {
        this.musics[MUSIC_MENU] = game.add.audio("mzk_mn", 1, !0);
        for (var a = 0; a < soundsList.length; a++) {
            var b = 1;
            3 === soundsList[a].length && (b = soundsList[a][2]);
            this.sounds[soundsList[a][0]] = game.add.audio(soundsList[a][0], b)
        }
    },
    playMusic: function(a, b) {
        if (SOUNDS_ENABLED && (a != this.actualMusic || 1 == b) && (this.actualMusic = a, this.musicON)) {
            for (var c = 0; c < this.musics.length; c++) this.musics[c].stop();
            this.musics[this.actualMusic].play()
        }
    },
    playSound: function(a,
        b) {
        if (SOUNDS_ENABLED && this.musicON && (!0 === b || !this.sounds[a].isPlaying)) try {
            this.sounds[a].play()
        } catch (c) {}
    },
    playStepSound: function() {
        if (SOUNDS_ENABLED && this.musicON && !1 === this.sounds.sndStep1.isPlaying && !1 === this.sounds.sndStep2.isPlaying) try {
            this.sounds["sndStep" + getRandomUIntInRange(1, 2)].play()
        } catch (a) {}
    },
    playSoundFadeIn: function(a) {
        if (SOUNDS_ENABLED && this.musicON) {
            try {
                this.sounds[a].fadeTween.stop()
            } catch (b) {}
            try {
                this.sounds[a].fadeIn(200, !0)
            } catch (c) {}
        }
    },
    playSoundFadeOut: function(a) {
        if (SOUNDS_ENABLED &&
            this.musicON) try {
            this.sounds[a].fadeOut(350)
        } catch (b) {}
    },
    pauseMusic: function() {
        SOUNDS_ENABLED && this.musicON && this.musics[this.actualMusic].pause()
    },
    resumeMusic: function() {
        SOUNDS_ENABLED && this.musicON && this.musics[this.actualMusic].resume()
    },
    stopMusic: function() {
        if (SOUNDS_ENABLED)
            for (var a = 0; a < this.musics.length; a++) this.musics[a].stop()
    },
    toggleEnableDisableMusic: function(a) {
        SOUNDS_ENABLED && (this.musicON ? (this.musicON = !1, this.stopMusic()) : (this.musicON = !0, this.playMusic(a || this.actualMusic, !0)), saveAllGameData())
    },
    toggleEnableDisableSound: function(a) {
        SOUNDS_ENABLED && (this.soundON = !this.soundON, saveAllGameData())
    }
};
var GameTexts = function() {
    this.xml = this.gameTextsParsed = null;
    this.gameTextsLists = []
};
GameTexts.prototype = {
    preload: function() {
        game.load.text("gameTexts", "lang.xml")
    },
    create: function() {
        xml = game.cache.getText("gameTexts");
        this.gameTextsParsed = (new DOMParser).parseFromString(xml, "text/xml");
        this.loadTexts()
    },
    loadTexts: function() {
        var a = this.gameTextsParsed.getElementsByTagName("string");
        for (i = 0; i < a.length; i++) null == this.gameTextsLists[a.item(i).getAttribute("id")] && (this.gameTextsLists[a.item(i).getAttribute("id")] = []), 0 < a.item(i).getElementsByTagName(LANGUAGES[GAME_LANGUAGE]).length &&
            (this.gameTextsLists[a.item(i).getAttribute("id")][GAME_LANGUAGE] = a.item(i).getElementsByTagName(LANGUAGES[GAME_LANGUAGE])[0].textContent.replace(/\\n/g, "\n").toUpperCase())
    },
    textFromID: function(a) {
        return void 0 == this.gameTextsLists[a] || void 0 == this.gameTextsLists[a][GAME_LANGUAGE] ? "" : this.gameTextsLists[a][GAME_LANGUAGE]
    },
    updateTextToWidth: function(a, b, c) {
        for (a.fontSize = b; a.width > c;) b--, a.fontSize = b
    },
    updateTextToHeight: function(a, b, c) {
        for (a.fontSize = b; a.height > c;) b--, a.fontSize = b
    }
};

function loadLanguageSettings() {
    var a = navigator.userLanguage || navigator.language,
        a = a.toLowerCase();
    systemLang = "en";
    for (var b = 1; b < LANGUAGES.length; b++) - 1 !== a.indexOf(LANGUAGES[b]) && (systemLang = LANGUAGES[b]);
    GAME_LANGUAGE = LANGUAGES.indexOf(systemLang);
    GAME_LANGUAGE === LANGUAGE_JA && (TEXT_CURRENT_COLOR_WHITE = TEXT_WHITE_COLOR, TEXT_CURRENT_COLOR_BROWN = TEXT_BROWN_COLOR, TEXT_CURRENT_COLOR_YELLOW = TEXT_YELLOW_COLOR, TEXT_CURRENT_COLOR_BROWN2 = TEXT_BROWN2_COLOR)
}
var LANGUAGE_EN = 0,
    LANGUAGE_DE = 1,
    LANGUAGE_FR = 2,
    LANGUAGE_ES = 3,
    LANGUAGE_BR = 4,
    LANGUAGE_IT = 5,
    LANGUAGE_TR = 6,
    LANGUAGE_NL = 7,
    LANGUAGE_NO = 8,
    LANGUAGE_JA = 9,
    LANGUAGES = "en de fr es br it tr nl no ja".split(" "),
    GAME_LANGUAGE = LANGUAGE_EN,
    systemLang = "",
    TEXT_WHITE_COLOR = "#FCFFED",
    TEXT_WHITE_COLOR2 = 2764124,
    TEXT_BROWN_COLOR = "#d9cb9c",
    TEXT_BROWN_COLOR2 = 2764124,
    TEXT_YELLOW_COLOR = "#e8c34f",
    TEXT_YELLOW_COLOR2 = 2764124,
    TEXT_BROWN2_COLOR = "#754b23",
    TEXT_BROWN2_COLOR2 = 2764124,
    TEXT_CURRENT_COLOR_WHITE = TEXT_WHITE_COLOR2,
    TEXT_CURRENT_COLOR_BROWN =
    TEXT_BROWN_COLOR2,
    TEXT_CURRENT_COLOR_YELLOW = TEXT_YELLOW_COLOR2,
    TEXT_CURRENT_COLOR_BROWN2 = TEXT_BROWN2_COLOR2,
    TEXT_PLAY = "PlayKey",
    TEXT_LEVELS = "LevelsKey",
    TEXT_HOME = "HomeKey",
    TEXT_RESUMEGAME = "ResumeGameKey",
    TEXT_REPLAY = "ReplayKey",
    TEXT_NEXT = "NextKey",
    TEXT_LEVELCOMPL = "LevelCompletedKey",
    TEXT_LEVEL = "LevelKey",
    TEXT_COMPLETED = "CompletedKey",
    TEXT_CARROTS_COLLECTED = "CarrotsCollectedKey",
    TEXT_BACK = "BackKey",
    TEXT_RESTART = "RestartKey",
    TEXT_HINT = "HintKey",
    TEXT_UNDO = "UndoKey",
    TEXT_ABOUT = "AboutKey",
    MORE_GAMES = "MORE_GAMES",
    TEXT_INSTR = "InstructionsKey",
    TEXT_GAME_PAUSED = "GamePausedKey",
    TEXT_PATH_COMPL = "PathCompleteKey",
    TEXT_TAP_TO_CONTINUE = "TTC";

var partnerName = "gradlecode";

function analyticsOnGameLoadEvent() {
    
}

function analyticsOnGameStartEvent() {
    
}

function analyticsOnLevelStartEvent(a) {
    
}

function analyticsOnLevelFinish(a) {
	
};

var GameData = function() {};
GameData.BuildTitle = "gradle";
GameData.BuildVersion = "1.0.0";
GameData.BuildString = "";
GameData.Copyright = "Gradle Code 2021";

var SOUNDS_ENABLED = !0,
    RUNNING_ON_WP = -1 < navigator.userAgent.indexOf("Windows Phone");
RUNNING_ON_WP && (SOUNDS_ENABLED = !1);
var RUNNING_ON_DESKTOP = !1,
    RUNNING_ON_IOS = !1,
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) RUNNING_ON_IOS = !0;
var GAME_VERSION = "1.0.0",
    GAME_NAME = "Gradle Game",
    APP_STATES = {
        MENU: 0,
        GAME_START: 1,
        GAME_RUNNING: 2,
        GAME_PAUSED: 3,
        GAME_PATH_COMPLETED: 4,
        GAME_OVER: 5
    },
    MUSIC_MENU = 0,
    LEVEL_OVER = 0,
    LEVEL_OVER_EXIT_BY_USER = 1;

function logToConsole() {}
Array.prototype.contains = function(a) {
    for (var b = this.length; b--;)
        if (this[b] === a) return !0;
    return !1
};

function getCorrectAnchorX(a, b) {
    return Math.round(a.width * b) / a.width
}

function getCorrectAnchorY(a, b) {
    return Math.round(a.height * b) / a.height
}

function getRandomUIntInRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function getRandomInt(a) {
    return Math.floor(Math.random() * a) * (50 < getRandomUInt(100) ? -1 : 1)
}

function getRandomUInt(a) {
    return Math.floor(Math.random() * a)
}

function setObjectAnchor(a, b, c) {
    null != b && (a.anchor.x = getCorrectAnchorX(a, b));
    null != c && (a.anchor.y = getCorrectAnchorY(a, c))
}

function average(a) {
    for (var b = 0, c = 0; c < a.length; c++) b += a[c];
    return Math.floor(b / a.length)
}
var GAME_MAX_FPS = 60,
    GAME_AVERAGE_FPS = 10,
    GAME_BG_COLOR = "#102b07",
    LEVEL_DATA_STARS_IDX = 0,
    LEVEL_DATA_BESTMOVES_IDX = 1;

function removeObjectTweens(a) {
    var b = function(a) {
            void 0 !== a.scaleObj && game.tweens.removeFrom(a.scaleObj, !0)
        },
        c = function(a) {
            for (var f = 0; f < a.children.length; f++) {
                var e = a.getChildAt(f);
                game.tweens.removeFrom(e.scale, !0);
                b(a.getChildAt(f));
                0 < a.getChildAt(f).children.length && c(a.getChildAt(f))
            }
        };
    c(a);
    game.tweens.removeFrom(a, !0);
    game.tweens.removeFrom(a.scale, !0);
    b(a)
}

function floorNumber(a) {
    return Math.floor(a)
}

function wordwrap(a, b, c, d) {
    b = 2 <= arguments.length ? +b : 75;
    c = 3 <= arguments.length ? "" + c : "\n";
    d = 4 <= arguments.length ? !!d : !1;
    var f, e, g;
    a += "";
    if (1 > b) return a;
    var k = /^\S*/,
        h = /\S*(\s)?$/,
        l = a.split(/\r\n|\n|\r/),
        m = l.length;
    for (f = 0; f < m; l[f++] += g)
        for (g = l[f], l[f] = ""; g.length > b;) {
            var p = g.slice(0, b + 1),
                n = 0,
                q = 0;
            e = p.match(h);
            e[1] ? (e = b, n = 1) : ((e = p.length - e[0].length) && (q = 1), !e && d && b && (e = b), e || (e = (g.slice(b).match(k) || [""])[0], e = p.length + e.length));
            l[f] += g.slice(0, e - q);
            g = g.slice(e + n);
            l[f] += g.length ? c : ""
        }
    return l.join("\n")
};
var IMAGE_FOLDER = "img/";

function loadSplash() {
    game.load.image("void", IMAGE_FOLDER + "void.png");
    game.load.image("inllogo", IMAGE_FOLDER + "logo.png");
    game.load.image("gamelogo", IMAGE_FOLDER + "ui-logo.png");
    game.load.image("loadingBG", IMAGE_FOLDER + "tap-to-c.png")
}

function loadImages() {
    game.load.atlas("impk", IMAGE_FOLDER + "spritesheet.png", IMAGE_FOLDER + "sprites.json");
    game.load.xml("gamefont_xml", "fnt/gamefont.xml");
    game.load.text("lvlzFile", "Levels.json");
    game.load.text("hntzFile", "Hints.json")
}

function loadSounds() {
    if (SOUNDS_ENABLED) {
        game.load.audio("mzk_mn", ["audio/MUSIC.ogg", "audio/MUSIC.mp3"]);
        for (var a = 0; a < soundsList.length; a++) game.load.audio(soundsList[a][0], ["audio/sounds/" + soundsList[a][1] + ".ogg", "audio/sounds/" + soundsList[a][1] + ".mp3"])
    }
}
var soundsList = [
    ["clck", "click", .8],
    ["sndEat", "BunnyEat", .5],
    ["sndStep1", "BunnyStep", .5],
    ["sndStep2", "BunnyStep2", .5],
    ["sndWin1", "rewardCarrot1", .5],
    ["sndWin2", "rewardCarrot2", .5],
    ["sndWin3", "rewardCarrot3", .5],
    ["sndTileMove1", "TileMove1", .5],
    ["sndTileMove2", "TileMove2", .5],
    ["sndTileMove3", "TileMove3", .5]
];

function showDiv(a, b) {
    null == b && (b = !1);
    if (!game.device.desktop || b) document.getElementById(a).style.display = "block"
}

function hideDiv(a, b) {
    null == b && (b = !1);
    if (!game.device.desktop || b) document.getElementById(a).style.display = "none"
};
var Buttons = function() {
    this.default_tint_empty = 16777215;
    this.default_tint_highlited = 10078449
};
Buttons.prototype = {
    constructor: Buttons,
    create: function() {},
    createOneImgButton: function(a, b, c, d, f, e, g, k) {
        a = game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        a.scaleOnDown = g;
        a.clbck = f;
        a.clbckCtx = e || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != k ? (a.maxScaleX = k[0], a.maxScaleY = k[1], a.scale.set(k[0], k[1])) : (a.maxScaleX =
            1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    createOneImgButtonWithText: function(a, b, c, d, f, e, g, k, h, l, m) {
        a = game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        a.scaleOnDown = l;
        GAME_LANGUAGE === LANGUAGE_JA ? d = game.make.text(0, .55 * -a.height, f, {
            font: "bold 10px gameFont",
            fill: g
        }) : (d = game.add.bitmapText(0, .6 * -a.height, "gamefont_bmp", f, 10), d.tint = g);
        setObjectAnchor(d, .5, .5);
        a.txtt = a.addChild(d);
        a.textID = e;
        a.maxTextWitdh = 1.3 *
            a.width;
        a.clbck = k;
        a.clbckCtx = h || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != m ? (a.maxScaleX = m[0], a.maxScaleY = m[1], a.scale.set(m[0], m[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    createTwoImgButton: function(a, b, c, d, f,
        e, g, k, h) {
        a = game.add.button(a, b, c);
        a.frame = d;
        a.isClickable = !0;
        d = game.make.sprite(0, 0, f, e);
        setObjectAnchor(d, .5, .5);
        a.addChild(d);
        a.clbck = g;
        a.clbckCtx = k || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != h ? (a.maxScaleX = h[0], a.maxScaleY = h[1], a.scale.set(h[0], h[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_highlited;
        a.tint_highlited = this.default_tint_empty;
        a.tint = a.tint_empty;
        return a
    },
    createMenuButtonWithText: function(a, b, c, d, f, e, g, k, h) {
        a = game.add.button(a, b, c);
        null !== d && (a.frameName = d);
        a.isClickable = !0;
        GAME_LANGUAGE === LANGUAGE_JA ? d = game.make.text(0, 1, f, {
            font: "bold 35px Arial",
            fill: TEXT_WHITE_COLOR
        }) : (d = game.add.bitmapText(0, -7, "gamefont_bmp", f, 40), d.tint = TEXT_WHITE_COLOR2);
        setObjectAnchor(d, .5, .5);
        a.txtt = a.addChild(d);
        a.textID = e;
        a.maxTextWitdh = .8 * a.width;
        a.clbck = g;
        a.clbckCtx = k || this;
        a.events.onInputUp.add(this.btnInputUp,
            this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != h ? (a.maxScaleX = h[0], a.maxScaleY = h[1], a.scale.set(h[0], h[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    createMenuButtonWithText1: function(a, b, c, d, f, e, g, k, h) {
        a = game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        GAME_LANGUAGE ===
            LANGUAGE_JA ? d = game.make.text(0, -25, f, {
                font: "bold 35px Arial",
                fill: TEXT_WHITE_COLOR
            }) : (d = game.add.bitmapText(0, -33, "gamefont_bmp", f, 40), d.tint = TEXT_WHITE_COLOR2);
        setObjectAnchor(d, .5, .5);
        a.txtt = a.addChild(d);
        a.textID = e;
        a.maxTextWitdh = .8 * a.width;
        a.clbck = g;
        a.clbckCtx = k || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != h ? (a.maxScaleX =
            h[0], a.maxScaleY = h[1], a.scale.set(h[0], h[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    reloadButtonText: function(a, b) {
        void 0 == b && (b = 40);
        void 0 != a.textID && (a.txtt.setText(gameTexts.textFromID(a.textID)), gameTexts.updateTextToWidth(a.txtt, b, a.maxTextWitdh), setObjectAnchor(a.txtt, .5, .5))
    },
    btnInputOver: function(a) {
        game.input.pointer1.isDown || (a.tint = a.tint_highlited, null != a.textChildIdx && this.setFontColor(a, !0));
        a.mouseOnBtn = !0
    },
    btnInputOut: function(a) {
        a.tint = a.tint_empty;
        null != a.textChildIdx && this.setFontColor(a, !1);
        a.mouseOnBtn = !1
    },
    btnInputUp: function(a) {
        a.tint = a.tint_empty;
        a.mouseOnBtn && RUNNING_ON_DESKTOP && (a.tint = a.tint_highlited);
        null != a.textChildIdx && this.setFontColor(a, !1);
        a.mouseOnBtn && (a.mouseOnBtn = !1, a.clbck.call(a.clbckCtx, a));
        void 0 != a.scaleOnDown && 1 != a.scaleOnDown || a.scale.set(a.maxScaleX || 1, a.maxScaleY || 1)
    },
    btnInputDown: function(a) {
        a.tint = a.tint_highlited;
        null != a.textChildIdx && this.setFontColor(a, !0);
        void 0 != a.scaleOnDown && 1 != a.scaleOnDown || a.scale.set(.95 * a.maxScaleX || .95, .95 * a.maxScaleY || .95);
        a.mouseOnBtn = !0
    },
    setFontColor: function(a, b) {
        for (var c = 0; c < a.textChildIdx.length; c++) b ? a.getChildAt(a.textChildIdx[c]).fill = "#CC9E6A" : a.getChildAt(a.textChildIdx[c]).fill = a.getChildAt(a.textChildIdx[c]).originalFill
    }
};
var GUI = function() {
    this.buttonsCreator = null;
    this.activeScreen = [];
    this.screensObjectsList = []
};
GUI.prototype = {
    preload: function() {
        this.screenLogo = new ScreenLogo;
        this.screensObjectsList.push(this.screenLogo);
        this.screenLevelSelection = new ScreenLevelSelection;
        this.screensObjectsList.push(this.screenLevelSelection);
        this.screenGame = new ScreenGame;
        this.screensObjectsList.push(this.screenGame);
        this.screenMainMenu = new ScreenMainMenu;
        this.screensObjectsList.push(this.screenMainMenu);
        this.screenAbout = new ScreenAbout;
        this.screensObjectsList.push(this.screenAbout);
        this.screenPause = new ScreenPause;
        this.screensObjectsList.push(this.screenPause);
        this.screenGameOver = new ScreenGameOver;
        this.screensObjectsList.push(this.screenGameOver);
        SOUNDS_ENABLED && (this.screenSounds = new ScreenSounds, this.screensObjectsList.push(this.screenSounds))
    },
    create: function() {
        this.buttonsCreator = new Buttons;
        this.buttonsCreator.create();
        for (var a in this.screensObjectsList) this.screensObjectsList.hasOwnProperty(a) && this.screensObjectsList[a].create();
        guiManager.resetScreenTexts();
        this.initParticles()
    },
    update: function() {
        for (var a in this.screensObjectsList) this.screensObjectsList.hasOwnProperty(a) &&
            !0 === this.screensObjectsList[a].screenGroup.visible && this.screensObjectsList[a].update();
        this.updateScreenShake();
        this.updateParticles()
    },
    resetScreenTexts: function() {
        for (var a in this.screensObjectsList) this.screensObjectsList.hasOwnProperty(a) && this.screensObjectsList[a].resetScreenTexts()
    },
    screenSwitcher_openNewScreen: function(a) {
        for (; 0 < this.activeScreen.length;) {
            var b = this.activeScreen.pop();
            void 0 != b.grayOverlay && 0 < b.grayOverlay.alpha && b.grayOverlay.hideTW.start();
            b.hideScreen.call(b)
        }
        this.activeScreen.push(a);
        a.showScreen.call(a);
        null != a.grayOverlay && (a.grayOverlay.alpha = 0, a.grayOverlay.visible = !1)
    },
    screenSwitcher_openOverlayScreen: function(a) {
        var b = this.activeScreen[this.activeScreen.length - 1];
        this.setButtonsInput(b.screenGroup, !1);
        null == b.grayOverlay ? (b.grayOverlay = b.screenGroup.addChild(this.getGraySprite()), b.grayOverlay.showTW.start(), b.grayOverlay.anim = !1) : (b.grayOverlay.alpha = 0, b.grayOverlay.visible = !0, b.grayOverlay.showTW.start());
        this.activeScreen.push(a);
        a.showScreen.call(a)
    },
    screenSwitcher_switchOverlayScreen: function(a) {
        var b =
            this.activeScreen.pop();
        b.hideScreen.call(b, function() {
            this.closeOverlayScreenOver(b)
        });
        this.activeScreen.push(a);
        a.showScreen.call(a);
        b.upperScreenName = a.name
    },
    screenSwitcher_closeOverlayScreen: function() {
        var a = this.activeScreen.pop();
        a.hideScreen.call(a, function() {
            this.closeOverlayScreenOver(a)
        }.bind(this));
        var b = this.activeScreen[this.activeScreen.length - 1];
        b.grayOverlay.hideTW.start();
        a.upperScreenName = b.screenGroup.name
    },
    closeOverlayScreenOver: function(a) {
        this.activeScreen[this.activeScreen.length -
            1].screenGroup.name == a.upperScreenName && this.setButtonsInput(this.activeScreen[this.activeScreen.length - 1].screenGroup, !0)
    },
    screenSwitcher_refreshActiveScreenElements: function() {
        for (var a = 0; a < this.activeScreen.length; a++) this.activeScreen[a].refreshScrFunc.call(this)
    },
    getGraySprite: function() {
        if (0 == game.cache.checkBitmapDataKey("grayBGg")) {
            var a = game.add.bitmapData(1, 1);
            a.fill(0, 0, 0, .65);
            game.cache.addBitmapData("grayBGg", a)
        }
        a = game.make.sprite(0, 0, game.cache.getBitmapData("grayBGg"));
        a.width = game.width;
        a.height = game.height;
        a.alpha = 0;
        a.showTW = game.add.tween(a).to({
            alpha: 1
        }, 150, Phaser.Easing.Linear.None, !1);
        a.hideTW = game.add.tween(a).to({
            alpha: 0
        }, 150, Phaser.Easing.Linear.None, !1);
        a.hideTW.onComplete.add(function(a) {
            a.showTW.isRunning || (a.visible = !1)
        }, this);
        a.isGraySprt = !0;
        return a
    },
    createBitmaps: function() {},
    create1x3WindowBitmap: function(a, b) {
        function c(a, b, c) {
            a = game.make.image(0, 0, "wind13", a);
            f.draw(a, b, c)
        }
        var d = Math.floor(a / 130),
            f = game.add.bitmapData(391, 130 * d);
        c(0, 0, 0);
        c(2, 0, 130 * (d - 1));
        for (var e =
                1; e < d - 1; e++) c(1, 0, 130 * e);
        if (null != b) game.cache.addBitmapData(b, f);
        else return f
    },
    create3x3WindowBitmap: function(a, b, c, d) {
        function f(a, b, d) {
            var f = game.make.image(0, 0, "windowInside", a);
            f.tint = c;
            e.draw(f, b, d);
            a = game.make.image(0, 0, "windowBorder", a);
            e.draw(a, b, d)
        }
        a = Math.floor(a / 46);
        b = Math.floor(b / 46);
        var e = game.add.bitmapData(46 * a, 46 * b);
        f(0, 0, 0);
        f(2, 46 * (a - 1), 0);
        f(6, 0, 46 * (b - 1));
        f(8, 46 * (a - 1), 46 * (b - 1));
        for (var g = 1; g < a - 1; g++) {
            var k = game.make.image(0, 0, "windowInside", 1);
            k.tint = c;
            e.draw(k, 46 * g, 0);
            k = game.make.image(0,
                0, "windowBorder", 1);
            e.draw(k, 46 * g, 0);
            var h = game.make.image(0, 0, "windowInside", 7);
            h.tint = c;
            e.draw(h, 46 * g, 46 * (b - 1));
            h = game.make.image(0, 0, "windowBorder", 7);
            e.draw(h, 46 * g, 46 * (b - 1))
        }
        for (g = 1; g < b - 1; g++) k = game.make.image(0, 0, "windowInside", 3), k.tint = c, e.draw(k, 0, 46 * g), k = game.make.image(0, 0, "windowBorder", 3), e.draw(k, 0, 46 * g), h = game.make.image(0, 0, "windowInside", 5), h.tint = c, e.draw(h, 46 * (a - 1), 46 * g), h = game.make.image(0, 0, "windowBorder", 5), e.draw(h, 46 * (a - 1), 46 * g);
        for (g = 1; g < b - 1; g++)
            for (h = 1; h < a - 1; h++) k = game.make.image(0,
                0, "windowInside", 4), k.tint = c, e.draw(k, 46 * h, 46 * g), k = game.make.image(0, 0, "windowBorder", 4), e.draw(k, 46 * h, 46 * g);
        if (null != d) game.cache.addBitmapData(d, e);
        else return e
    },
    setButtonsInput: function(a, b) {
        var c = function(a) {
            for (var f = 0; f < a.children.length; f++)
                if (!0 !== a.getChildAt(f).dontChangeInput) {
                    var e = a.getChildAt(f);
                    e.inputEnabled = !1;
                    1 == e.isClickable && (e.inputEnabled = b, void 0 !== e.tint_empty && (e.tint = e.tint_empty));
                    0 < a.getChildAt(f).children.length && c(a.getChildAt(f))
                }
        };
        c(a)
    },
    showScreenFromRight: function(a,
        b, c, d, f) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.x = game.width;
        a.visible = !0;
        c = game.add.tween(a).to({
            x: 0
        }, c, f, !0, d);
        !0 === b && c.onComplete.add(function() {
            a.showScreenOver.call(this)
        }, this)
    },
    hideScreenToRight: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.x = 0;
        a = game.add.tween(a).to({
            x: game.width
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
                e.hideScreenOver.call(e);
                void 0 !== e.screenGroup.hideOverClbck && e.screenGroup.hideOverClbck.call(e)
            },
            this)
    },
    showScreenFromLeft: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.x = -game.width;
        a.visible = !0;
        a = game.add.tween(a).to({
            x: 0
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.showScreenOver.call(e)
        }, this)
    },
    hideScreenToLeft: function(a, b, c, d, f) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.x = 0;
        c = game.add.tween(a).to({
            x: -game.width
        }, c, f, !0, d);
        !0 === b && c.onComplete.add(function() {
            a.hideScreenOver.call(this);
            void 0 !==
                a.hideOverClbck && a.hideOverClbck.call(this)
        }, this)
    },
    showScreenFromBottom: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y = game.height;
        a.visible = !0;
        a = game.add.tween(a).to({
            y: 0
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.showScreenOver.call(e);
            void 0 !== e.screenGroup.hideOverClbck && e.screenGroup.hideOverClbck.call(e)
        }, this)
    },
    hideScreenToBottom: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y =
            0;
        a = game.add.tween(a).to({
            y: game.height
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.hideScreenOver.call(e);
            void 0 !== e.screenGroup.hideOverClbck && e.screenGroup.hideOverClbck.call(e)
        }, this)
    },
    showScreenFromTop: function(a, b, c, d, f) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y = -game.height;
        a.visible = !0;
        c = game.add.tween(a).to({
            y: 0
        }, c, f, !0, d);
        !0 === b && c.onComplete.add(function() {
            a.showScreenOver.call(this)
        }, this)
    },
    hideScreenToTop: function(a, b, c, d, f) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y = 0;
        c = game.add.tween(a).to({
            y: -game.height
        }, c, f, !0, d);
        !0 === b && c.onComplete.add(function() {
            a.hideScreenOver.call(this);
            void 0 !== a.hideOverClbck && a.hideOverClbck.call(this)
        }, this);
        return c
    },
    showScreenAlpha: function(a, b, c, d) {
        c = c || 300;
        d = d || 150;
        a.alpha = 0;
        game.add.tween(a).to({
            alpha: 1
        }, c, Phaser.Easing.Linear.None, !0, d).onComplete.add(b, this)
    },
    hideScreenAlpha: function(a, b, c, d) {
        c = c || 300;
        d = d || 150;
        game.add.tween(a).to({
            alpha: 0
        }, c, Phaser.Easing.Linear.None, !0, d).onComplete.add(b, this)
    },
    showScreenCustomTweens: function(a) {
        a.visible = !0;
        for (var b = a.tweenCallbacksCount = 0; b < a.length; b++)
            if (1 == a.getChildAt(b).showTW instanceof Array)
                for (var c = 0; c < a.getChildAt(b).showTW.length; c++) 0 != a.getChildAt(b).anim && (a.getChildAt(b).showTW[c].start(), void 0 != a.getChildAt(b).useTweenToFinishiShow && !0 === a.getChildAt(b).useTweenToFinishiShow && a.tweenCallbacksCount++);
            else void 0 != a.getChildAt(b).showTW && 0 != a.getChildAt(b).anim && (a.getChildAt(b).showTW.start(), void 0 != a.getChildAt(b).useTweenToFinishiShow &&
                !0 === a.getChildAt(b).useTweenToFinishiShow && a.tweenCallbacksCount++)
    },
    hideScreenCustomTweens: function(a) {
        for (var b = a.tweenCallbacksCount = 0; b < a.length; b++)
            if (1 == a.getChildAt(b).hideTW instanceof Array)
                for (var c = 0; c < a.getChildAt(b).hideTW.length; c++) a.getChildAt(b).hideTW[c].start();
            else void 0 != a.getChildAt(b).hideTW && 0 != a.getChildAt(b).anim && (a.getChildAt(b).hideTW.start(), a.tweenCallbacksCount++)
    },
    addShowTween: function(a, b, c, d, f, e, g, k, h, l) {
        b = game.add.tween(b).to(c, d, f, !1, e);
        null != k && b.onComplete.addOnce(k,
            l);
        null != h && b.onComplete.add(h, l);
        void 0 == a.showTW && (a.showTW = []);
        a.useTweenToFinishiShow = g;
        a.showTW.push(b);
        return b
    },
    addHideTween: function(a, b, c, d, f, e, g, k, h) {
        a.hideTW = game.add.tween(b).to(c, d, f, !1, e);
        null != g && a.hideTW.onComplete.addOnce(g, h);
        null != k && a.hideTW.onComplete.add(k, h)
    },
    checkShowScreenOver: function(a, b) {
        a.tweenCallbacksCount--;
        0 > a.tweenCallbacksCount ? logToConsole("vela show tweenov:", a.name) : 0 == a.tweenCallbacksCount && (logToConsole("checkShowScreenOver:", a.name), b.showScreenOver.call(b))
    },
    checkHideScreenOver: function(a, b) {
        a.tweenCallbacksCount--;
        0 > a.tweenCallbacksCount ? logToConsole("vela hide tweenov:", a.name) : 0 == a.tweenCallbacksCount && (logToConsole("checkHideScreenOver:", a.name), b.hideScreenOver.call(b), void 0 != a.hideOverClbck && a.hideOverClbck.call(this))
    },
    shakeScene: function(a, b, c, d, f, e) {
        if (void 0 == a.isShaking || 0 == a.isShaking) {
            a.isShaking = !0;
            void 0 === b && (b = 3);
            void 0 === c && (c = 0);
            void 0 === d && (d = 50);
            void 0 === f && (f = null);
            void 0 === e && (e = null);
            game.tweens.removeFrom(a, !0);
            var g = game.add.tween(a.position);
            a.position.orgX = a.position.x;
            a.position.orgY = a.position.y;
            a.position.shakeAmount = b;
            g.to({
                x: a.position.x,
                y: a.position.y
            }, d, Phaser.Easing.Cubic.InOut, !0, c);
            g.onUpdateCallback(function(a, b, c) {
                a.target.x = a.target.orgX + getRandomInt(a.target.shakeAmount);
                a.target.y = a.target.orgY + getRandomInt(a.target.shakeAmount);
                null != this.callbackOnUpdate && this.callbackOnUpdate(b)
            }, {
                callbackOnUpdate: e
            });
            g.onComplete.add(function() {
                this.scene.position.x = this.scene.position.orgX;
                this.scene.position.y = this.scene.position.orgY;
                a.isShaking = !1;
                null != this.callbackOnComplete && this.callbackOnComplete()
            }, {
                scene: a,
                callbackOnComplete: f
            });
            return g
        }
    },
    screenShakeFire: function(a, b) {
        this._shakeWorldTime = a || 20;
        this._shakeWorldMax = b || 20;
        null == this._boundsCache && (this._boundsCache = Phaser.Utils.extend(!1, {}, game.world.bounds));
        game.world.setBounds(this._boundsCache.x - this._shakeWorldMax, this._boundsCache.y - this._shakeWorldMax, this._boundsCache.width + 2 * this._shakeWorldMax, this._boundsCache.height + 2 * this._shakeWorldMax)
    },
    updateScreenShake: function() {
        if (0 <
            this._shakeWorldTime) {
            var a = this._shakeWorldTime / this._shakeWorldMax * this._shakeWorldMax,
                b = game.rnd.integerInRange(-a, a),
                a = game.rnd.integerInRange(-a, a);
            game.camera.x = b;
            game.camera.y = a;
            this._shakeWorldTime--;
            0 >= this._shakeWorldTime && (game.world.setBounds(this._boundsCache.x, this._boundsCache.x, this._boundsCache.width, this._boundsCache.height), this._boundsCache = null)
        }
    },
    initParticles: function() {
        this.particlesGroup = game.add.group()
    },
    fireParticle: function(a, b, c, d) {
        void 0 == c && (c = 1);
        for (var f = 0; f < c && !(40 <
                this.particlesGroup.countLiving()); f++) {
            var e = this.particlesGroup.getFirstDead();
            null == e && (e = this.particlesGroup.create(0, 0, "impk", "partik-star"), setObjectAnchor(e, .5, .5), game.physics.enable(e, Phaser.Physics.ARCADE));
            e.reset(a, b);
            e.angle = Math.floor(90 * Math.random()) - 45;
            e.rotateStep = Math.floor(200 * Math.random()) / 10 - 10;
            void 0 !== d && e.scale.set(d());
            e.angle = Math.floor(360 * Math.random());
            e.allowGravity = !0;
            e.body.gravity.y = 300 + Math.floor(800 * Math.random());
            var g = 25 * Math.floor(15 * Math.random() + 1);
            e.body.velocity.y = -g;
            g = Math.floor(300 * Math.random()) - 150;
            e.body.velocity.x = g;
            e.revive()
        }
    },
    updateParticles: function() {
        this.particlesGroup.forEachAlive(function(a) {
            a.angle += a.rotateStep;
            a.y - 30 > game.height && a.kill()
        }, this)
    },
    createBackground: function() {
        game.stage.backgroundColor = GAME_BG_COLOR;
        this.backgroundGroup = game.add.group();
        var a = game.add.sprite(0, 0, "gameBgImg");
        this.backgroundGroup.addChild(a);
        game.height > a.height && (a.height = game.height)
    }
};
var ScreenGame = function() {
    this.screenGroup = null;
    this.screenName = "ScreenGame";
    this.bottomButtonsFontSize = 18
};
ScreenGame.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        var a = game.add.group();
        a.dontChangeInput = !0;
        var b = game.make.sprite(0, 0, "impk", "back");
        a.addChild(b);
        var c = game.add.group();
        a.addChild(c);
        b = game.add.group();
        b.x = Math.floor(37);
        b.y = Math.floor(30);
        a.gmeGroup = c.addChild(b);
        var d = game.make.group();
        d.x = b.x;
        d.y = b.y;
        a.pajkoGroup = c.addChild(d);
        guiManager.addShowTween(a, a, {
                alpha: 1
            }, 300, Phaser.Easing.Linear.None, 0, !0, null,
            function() {
                guiManager.checkShowScreenOver(this.screenGroup, this)
            }, this);
        guiManager.addHideTween(a, a, {
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        this.hintImg = game.make.sprite(0, 0, "impk", "gp-select");
        setObjectAnchor(this.hintImg, .5, 0);
        this.hintImg.offsetPos = {
            x: b.x,
            y: b.y
        };
        this.hintImg.visible = !1;
        c.addChild(this.hintImg);
        this.hintHandImg = game.make.sprite(0, 0, "impk", "gp-ruka");
        this.hintHandImg.visible = !1;
        c.addChild(this.hintHandImg);
        d = game.add.group();
        d.x = game.width / 2;
        var f = game.make.sprite(0, 0, "impk", "gp-top");
        setObjectAnchor(f, .5, 0);
        d.visibleY = .1 * -f.height;
        d.hiddenY = -f.height;
        d.addChild(f);
        guiManager.addShowTween(d, d, {
            y: d.visibleY
        }, 200, Phaser.Easing.Back.Out, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(d, d, {
            y: d.hiddenY
        }, 200, Phaser.Easing.Quadratic.In, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        var e = game.make.sprite(-150, Math.floor(.5 *
            f.height), "impk", "bar1");
        e.scale.set(.85);
        setObjectAnchor(e, .5, .5);
        d.addChild(e);
        var g = game.make.sprite(0, 100, "impk", "bar-prog_1");
        setObjectAnchor(g, .5, .5);
        d.addChild(g);
        this.starsList = [];
        e = function(a, b, c) {
            a = game.make.sprite(a, b, "impk");
            a.aaaaaam = c;
            a.frameName = "bar-mrkva_" + c + "";
            setObjectAnchor(a, .5, .5);
            g.addChild(a);
            this.starsList.push(a)
        }.bind(this);
        e(-50, -10, 3);
        e(50, -10, 5);
        e(0, -10, 4);
        e = game.make.sprite(150, 96, "impk", "bar-win2");
        e.scale.set(.8);
        setObjectAnchor(e, .5, 0);
        d.addChild(e);
        GAME_LANGUAGE ==
            LANGUAGE_JA ? this.lvlNumbText = game.make.text(0, 4, gameTexts.textFromID(TEXT_LEVEL), {
                font: "bold 25px Arial",
                fill: TEXT_BROWN2_COLOR,
                align: "center"
            }) : (this.lvlNumbText = game.add.bitmapText(0, 4, "gamefont_bmp", gameTexts.textFromID(TEXT_LEVEL), 25), this.lvlNumbText.tint = TEXT_BROWN2_COLOR2, this.lvlNumbText.align = "center");
        this.lvlNumbText.lineSpacing = -10;
        setObjectAnchor(this.lvlNumbText, .5, 0);
        e.addChild(this.lvlNumbText);
        e = guiManager.buttonsCreator.createOneImgButton(176, 55, "impk", "buttons_16", this.pauseClicked,
            this, null, [.8, .8]);
        this.pauseButton = d.addChild(e);
        var e = game.add.group(),
            k = game.make.sprite(game.width / 2, game.height, "impk", "gp-bottom");
        k.anchor.set(.5, 1);
        e.visibleY = .1 * k.height;
        e.hiddenY = k.height;
        e.addChild(k);
        guiManager.addShowTween(e, e, {
            y: e.visibleY
        }, 200, Phaser.Easing.Back.Out, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(e, e, {
            y: e.hiddenY
        }, 200, Phaser.Easing.Quadratic.In, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup,
                this)
        }, this);
        this.bottomButtons = [];
        var h = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2 - 150, game.height - 40 - e.visibleY, "impk", "buttons_7", gameTexts.textFromID(TEXT_BACK), TEXT_BACK, TEXT_CURRENT_COLOR_BROWN, this.backToLevelSelectionBtnClicked, this);
        this.backButton = e.addChild(h);
        this.bottomButtons.push(h);
        h = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2 - 50, game.height - 40 - e.visibleY, "impk", "buttons_9", gameTexts.textFromID(TEXT_RESTART), TEXT_RESTART, TEXT_CURRENT_COLOR_BROWN,
            this.resetClicked, this);
        h.txtt.align = "center";
        if (GAME_LANGUAGE === LANGUAGE_NL || GAME_LANGUAGE === LANGUAGE_TR) h.txtt.y -= 9;
        this.restartButton = e.addChild(h);
        this.bottomButtons.push(h);
        h = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2 + 50, game.height - 40 - e.visibleY, "impk", "buttons_11", gameTexts.textFromID(TEXT_HINT), TEXT_HINT, TEXT_CURRENT_COLOR_BROWN, this.hintClicked, this);
        h.txtt.anchor.y = 1;
        h.txtt.align = "center";
        h.txtt.lineSpacing = -5;
        h.txtt.y = -32;
        h.txtt.fontSize = this.bottomButtonsFontSize;
        this.hintButton = e.addChild(h);
        h = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2 + 150, game.height - 40 - e.visibleY, "impk", "buttons_10", gameTexts.textFromID(TEXT_UNDO), TEXT_UNDO, TEXT_CURRENT_COLOR_BROWN, this.undoMoveClicked, this);
        this.undoMoveButton = e.addChild(h);
        this.bottomButtons.push(h);
        var l = .9 * f.height + .9 * k.height,
            m = a.height,
            p = a.width,
            n = h = 1;
        0 > game.height - m - l && (h = (game.height - m) / l, h = Math.floor(100 * h) / 100);
        0 > game.width - p && (n = game.width / p, n = Math.floor(100 * n) / 100);
        l = 1;
        h < l && (l = h);
        n < l &&
            (l = n);
        1 > l && (a.scale.set(l), a.width = Math.floor(a.width), a.height = Math.floor(a.height));
        a.x = (game.width - a.width) / 2;
        a.y = (game.height - a.height - f.height - k.height) / 2 + f.height;
        this.screenGroup.bottomBarGroup = this.screenGroup.addChild(e);
        this.screenGroup.gameBoardGroup = this.screenGroup.addChild(a);
        this.screenGroup.upperBarGrp = this.screenGroup.addChild(d);
        this.screenGroup.gameBoardContentGroup = c;
        GAME_LANGUAGE === LANGUAGE_JA ? (c = 3, this.pathComplTextBack = game.make.text(-game.width / 2 + c, game.height / 2 + c, gameTexts.textFromID(TEXT_PATH_COMPL), {
            font: "bold 50px Arial",
            fill: TEXT_BROWN2_COLOR,
            align: "center"
        }), this.pathComplText = game.make.text(-c, -c, gameTexts.textFromID(TEXT_PATH_COMPL), {
            font: "bold 50px Arial",
            fill: TEXT_YELLOW_COLOR,
            align: "center"
        })) : (c = 3, this.pathComplTextBack = game.add.bitmapText(-game.width / 2 + c, game.height / 2 + c, "gamefont_bmp", gameTexts.textFromID(TEXT_PATH_COMPL), 60), this.pathComplTextBack.align = "center", this.pathComplTextBack.tint = TEXT_BROWN2_COLOR2, this.pathComplText = game.add.bitmapText(-c, -c, "gamefont_bmp", gameTexts.textFromID(TEXT_PATH_COMPL),
            60), this.pathComplText.align = "center", this.pathComplText.tint = TEXT_YELLOW_COLOR2);
        this.pathComplTextBack.addChild(this.pathComplText);
        setObjectAnchor(this.pathComplTextBack, .5, .5);
        setObjectAnchor(this.pathComplText, .5, .5);
        this.screenGroup.pathComplTextBack = this.screenGroup.addChild(this.pathComplTextBack);
        c = game.add.graphics(0, 0);
        c.beginFill(16777215, .5);
        c.drawRect(a.x + Math.floor(30 * a.scale.x), a.y, a.width - Math.floor(60 * a.scale.x), a.height - Math.floor(41 * a.scale.x));
        this.screenGroup.addChild(c);
        b.mask =
            c
    },
    update: function() {},
    pauseClicked: function() {
        musicPlayer.playSound("clck");
        this.pauseGame()
    },
    pauseGame: function() {
        if (appState === APP_STATES.GAME_RUNNING || appState === APP_STATES.GAME_START) guiManager.screenSwitcher_openOverlayScreen(guiManager.screenPause), appState = APP_STATES.GAME_PAUSED
    },
    hintClicked: function() {
        musicPlayer.playSound("clck");
        appState === APP_STATES.GAME_RUNNING && gamePlay.startHint()
    },
    undoMoveClicked: function() {
        musicPlayer.playSound("clck");
        appState === APP_STATES.GAME_RUNNING && gamePlay.undoMove()
    },
    resetClicked: function() {
        musicPlayer.playSound("clck");
        appState === APP_STATES.GAME_RUNNING && !0 !== gamePlay.hintRunning && (gamePlay.clearGame(), gamePlay.prepareNewGame())
    },
    backToLevelSelectionBtnClicked: function() {
        musicPlayer.playSound("clck");
        appState === APP_STATES.GAME_RUNNING && (guiManager.screenSwitcher_openNewScreen(guiManager.screenLevelSelection), appState = APP_STATES.MENU)
    },
    hintHide: function() {
        this.hintImg.visible = !1;
        this.hintHandImg.visible = !1;
        removeObjectTweens(this.hintHandImg)
    },
    hintShow: function() {
        this.hintImg.visible = !0;
        this.hintHandImg.visible = !0
    },
    lockUndoResetHintButtons: function() {
        this.undoMoveButton.inputEnabled = !1;
        this.restartButton.inputEnabled = !1;
        this.undoMoveButton.isClickable = !1;
        this.restartButton.isClickable = !1;
        this.undoMoveButton.tint = 4473924;
        this.restartButton.tint = 4473924;
        this.lockHintButton()
    },
    lockHintButton: function() {
        this.hintButton.inputEnabled = !1;
        this.hintButton.isClickable = !1;
        this.hintButton.tint = 4473924
    },
    unLockHintButton: function() {
        this.hintButton.inputEnabled = !0;
        this.hintButton.isClickable = !0;
        this.hintButton.tint = 16777215
    },
    resetUndoResetHintButtons: function() {
        this.undoMoveButton.isClickable = !0;
        this.restartButton.isClickable = !0;
        this.hintButton.isClickable = !0
    },
    showStars: function(a) {
        3 < a && (a = 3);
        for (var b = 0; b < this.starsList.length; b++) this.starsList[b].frame = this.starsList[b].frameName = "bar-mrkva_" + this.starsList[b].aaaaaam + "";
        for (b = 0; b < a; b++) this.starsList[b].frame = this.starsList[b].frameName = "bar-mrkva_" + (this.starsList[b].aaaaaam - 3) + ""
    },
    showPathCompleteText: function() {
        removeObjectTweens(this.pathComplTextBack);
        game.add.tween(this.pathComplTextBack).to({
            x: [game.width / 2 - 20, game.width / 2, game.width / 2 + 20, game.width + this.pathComplTextBack.width / 2 + 20]
        }, 1350, Phaser.Easing.Linear.None, !0)
    },
    showScreen: function() {
        this.screenGroup.upperBarGrp.y = this.screenGroup.upperBarGrp.hiddenY;
        this.screenGroup.bottomBarGroup.y = this.screenGroup.bottomBarGroup.hiddenY;
        this.screenGroup.gameBoardGroup.alpha = 0;
        guiManager.setButtonsInput(this.screenGroup, !1);
        guiManager.showScreenCustomTweens(this.screenGroup);
        SOUNDS_ENABLED && guiManager.screenSounds.setBtnPosition(ScreenSounds.positionX_ingame)
    },
    resetScreenContent: function() {
        4 === gamePlay.currentLevelSize ? this.screenGroup.gameBoardContentGroup.scale.set(1) : 5 === gamePlay.currentLevelSize && this.screenGroup.gameBoardContentGroup.scale.set(.82);
        this.lvlNumbText.setText(gameTexts.textFromID(TEXT_LEVEL) + "\n" + (gamePlay.currentLevel + 1));
        this.setHintButtonText(gamePlay.hintCount, gamePlay.hint_timeTillNext);
        this.pathComplTextBack.x = -this.pathComplTextBack.width - 20;
        0 === gamePlay.hintCount && this.lockHintButton()
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a;
        SOUNDS_ENABLED && guiManager.screenSounds.setBtnPosition(ScreenSounds.positionX_standard)
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1;
        gamePlay.clearGame()
    },
    resetScreenTexts: function() {
        for (var a = 0; a < this.bottomButtons.length; a++) guiManager.buttonsCreator.reloadButtonText(this.bottomButtons[a], this.bottomButtonsFontSize);
        this.pathComplTextBack.setText(gameTexts.textFromID(TEXT_PATH_COMPL));
        setObjectAnchor(this.pathComplTextBack, .5, .5);
        this.pathComplText.setText(gameTexts.textFromID(TEXT_PATH_COMPL));
        setObjectAnchor(this.pathComplText, .5, .5)
    },
    setHintButtonText: function(a, b) {
        if (a >= HINT_COUNT_MAX) this.hintButton.txtt.setText(gameTexts.textFromID(TEXT_HINT) + "(" + a + "/" + HINT_COUNT_MAX + ")");
        else {
            var c = Math.floor(b / 60),
                d = Math.floor(b % 60);
            10 > d && (d = "0" + d);
            this.hintButton.txtt.setText("(" + c + ":" + d + ")\n" + gameTexts.textFromID(TEXT_HINT) + "(" + a + "/" + HINT_COUNT_MAX + ")")
        }
    }
};
var ScreenMainMenu = function() {
    this.screenGroup = null;
    this.screenName = "ScreenMainMenu";
    this.maxFontSize = 38
};
ScreenMainMenu.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        GAME_LANGUAGE == LANGUAGE_JA && (this.maxFontSize = 35);
        var a = [];
        this.btns = a;
        var b = guiManager.buttonsCreator.createMenuButtonWithText1(game.width / 2, ScreenLogo.positionY_mainmenu + guiManager.screenLogo.getLogoHeight(), "impk", "button-play", gameTexts.textFromID(TEXT_PLAY), TEXT_PLAY, this.mainMenuPlayButtonClicked, this);
        b.scaleOnDown = !1;
        b.pulse1TW = game.add.tween(b.scale).to({
            x: [1.02,
                1
            ],
            y: [.98, 1]
        }, 600, Phaser.Easing.Linear.None, !1, 0);
        b.pulse1TW.onComplete.add(function() {
            this.screenGroup.visible && b.pulse2TW.start()
        }, this);
        b.pulse2TW = game.add.tween(b.scale).to({
            x: [.98, 1],
            y: [1.02, 1]
        }, 600, Phaser.Easing.Linear.None, !1, 0);
        b.pulse2TW.onComplete.add(function() {
            this.screenGroup.visible && b.pulse1TW.start()
        }, this);
        this.screenGroup.playBtn = this.screenGroup.addChild(b);
        a.push(b);
        var c = game.make.sprite(-50, 14, "impk", "mrkva-mm");
        setObjectAnchor(c, .5, .5);
        b.addChild(c);
        this.plyBtnScore = game.add.bitmapText(.09 *
            b.width, 10, "gamefont_bmp", "720/720", 30);
        this.plyBtnScore.tint = TEXT_WHITE_COLOR2;
        setObjectAnchor(this.plyBtnScore, .5, .5);
        b.addChild(this.plyBtnScore);
        c = guiManager.buttonsCreator.createMenuButtonWithText(game.width / 2, Math.floor(b.y + .85 * b.height), "impk", "button-item", gameTexts.textFromID(TEXT_LEVELS), TEXT_LEVELS, this.levelBtnClicked, this);
        this.screenGroup.addChild(c);
        a.push(c);
        c = guiManager.buttonsCreator.createMenuButtonWithText(game.width / 2, Math.floor(c.y + c.height), "impk", "button-item", gameTexts.textFromID(TEXT_ABOUT),
            TEXT_ABOUT, this.infoBtnClicked, this);
        this.screenGroup.addChild(c);
        a.push(c);
        for (var c = [130, 80, 110, 50], d = 0; d < a.length; d++) guiManager.addShowTween(a[d], a[d].scale, {
            x: a[d].maxScaleX
        }, 200, Phaser.Easing.Back.Out, c[d], !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this), guiManager.addShowTween(a[d], a[d].scale, {
            y: a[d].maxScaleY
        }, 200, Phaser.Easing.Quadratic.Out, c[d], !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this), guiManager.addHideTween(a[d], a[d], {
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this)
    },
    update: function() {},
    mainMenuPlayButtonClicked: function() {
		gradle.event('btn_play');
        gamePlay.currentLevel = gamePlay.getLevelToPlay();
        gamePlay.prepareNewGame();
        guiManager.screenSwitcher_openNewScreen(guiManager.screenGame);
        musicPlayer.playSound("clck");
        guiManager.screenLogo.hideScreen()
    },
    levelBtnClicked: function() {
		gradle.event('btn_levels');
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenLevelSelection);
        guiManager.screenLogo.hideScreen()
    },
    infoBtnClicked: function() {
		gradle.event('btn_info');
        musicPlayer.playSound("clck");
        guiManager.screenLogo.setLogoPosition(ScreenLogo.positionY_about);
        guiManager.screenSwitcher_openNewScreen(guiManager.screenAbout)
    },
    optionsClicked: function() {
		gradle.event('btn_option');
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenOptions)
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        for (var a = 0; a < this.screenGroup.children.length; a++) this.screenGroup.getChildAt(a).alpha =
            1, this.screenGroup.getChildAt(a).scale.set(0);
        this.plyBtnScore.text = gamePlay.countCollectedCarrots() + "/" + 3 * LEVELS_COUNT_PER_GAME_MODE;
        guiManager.screenLogo.showScreen();
        guiManager.showScreenCustomTweens(this.screenGroup)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0);
        this.screenGroup.playBtn.pulse1TW.start()
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {
        for (var a = 0; a < this.btns.length; a++) guiManager.buttonsCreator.reloadButtonText(this.btns[a], this.maxFontSize)
    },
    setCarrotsCollected: function(a, b) {
        this.plyBtnScore.setText(a + "/" + b)
    }
};
var ScreenAbout = function() {
    this.screenGroup = null;
    this.screenName = "ScreenAbout"
};
ScreenAbout.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        var a = game.make.sprite(game.width / 2, game.height, "impk", "gp-bottom");
        a.anchor.set(.5, 1);
        a.visibleY = game.height + .3 * a.height;
        a.hiddenY = game.height + a.height;
        guiManager.addShowTween(a, a, {
            y: a.visibleY
        }, 200, Phaser.Easing.Back.Out, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(a, a, {
                y: a.hiddenY
            }, 200, Phaser.Easing.Quadratic.In,
            0, null,
            function() {
                guiManager.checkHideScreenOver(this.screenGroup, this)
            }, this);
        this.btmPanel = this.screenGroup.addChild(a);
        var b = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2, game.height - 32, "impk", "buttons_3", gameTexts.textFromID(TEXT_HOME), TEXT_HOME, TEXT_CURRENT_COLOR_WHITE, this.backBtnClicked, this);
        b.visibleY = game.height - 32;
        b.hiddenY = a.hiddenY;
        guiManager.addShowTween(b, b.scale, {
            x: b.maxScaleX
        }, 200, Phaser.Easing.Back.Out, 500, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup,
                this)
        }, this);
        guiManager.addShowTween(b, b.scale, {
            y: b.maxScaleY
        }, 200, Phaser.Easing.Quadratic.Out, 500, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(b, b, {
            y: a.hiddenY
        }, 200, Phaser.Easing.Quadratic.In, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        this.backBtn = this.screenGroup.addChild(b);
        this.contentList = [];
        GAME_LANGUAGE === LANGUAGE_JA ? (a = game.make.text(game.width / 2, ScreenLogo.positionY_about + Math.floor(guiManager.screenLogo.getLogoHeight() /
            2) + 20, gameTexts.textFromID(TEXT_INSTR), {
            font: "18px Arial",
            fill: TEXT_WHITE_COLOR,
            align: "center",
            wordWrap: !0,
            wordWrapWidth: .85 * game.width
        }), a.lineSpacing = -3) : (a = game.add.bitmapText(game.width / 2, ScreenLogo.positionY_about + Math.floor(guiManager.screenLogo.getLogoHeight() / 2) + 20, "gamefont_bmp", gameTexts.textFromID(TEXT_INSTR), 18), a.text = wordwrap(gameTexts.textFromID(TEXT_INSTR), 50), a.tint = TEXT_WHITE_COLOR2, a.align = "center");
        setObjectAnchor(a, .5, 0);
        a.defScale = 1;
        this.contentList.push(this.screenGroup.addChild(a));
        this.instrText = a;
        a = game.make.sprite(game.width / 2, a.y + a.height + 20, "impk", "logo");
        a.defScale = .55;
        a.scale.set(.6);
        setObjectAnchor(a, .5, 0);
        this.contentList.push(this.screenGroup.addChild(a));
        this.inlLogo = a;
        a = game.add.bitmapText(game.width / 2, a.y + a.height + 20, "gamefont_bmp", "\n", 27);
        a.tint = TEXT_WHITE_COLOR2;
        a.align = "center";
        setObjectAnchor(a, .5, 0);
        a.defScale = 1;
        this.contentList.push(this.screenGroup.addChild(a));
        this.aboutText = a;
        a = [50, 150, 250, 350];
        for (b = 0; b <
            this.contentList.length; b++) guiManager.addShowTween(this.contentList[b], this.contentList[b], {
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, a[b], !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this), guiManager.addHideTween(this.contentList[b], this.contentList[b], {
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this)
    },
    update: function() {},
    backBtnClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenLogo.setLogoPosition(ScreenLogo.positionY_mainmenu);
        guiManager.screenSwitcher_openNewScreen(guiManager.screenMainMenu)
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.btmPanel.y = void 0 === this.btmPanel.anim || !0 === this.btmPanel.anim ? this.btmPanel.hiddenY : this.btmPanel.visibleY;
        this.backBtn.alpha = 1;
        this.backBtn.scale.set(0);
        this.backBtn.y = this.backBtn.visibleY;
        for (var a = 0; a < this.contentList.length; a++) this.contentList[a].alpha = 0;
        guiManager.showScreenCustomTweens(this.screenGroup)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {
        this.instrText.text = wordwrap(gameTexts.textFromID(TEXT_INSTR), 50);
        setObjectAnchor(this.instrText, .5, 0);
        guiManager.buttonsCreator.reloadButtonText(this.backBtn, 20)
    }
};
var ScreenPause = function() {
    this.screenGroup = null;
    this.screenName = "ScreenPause";
    this.maxFontSize = 28
};
ScreenPause.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        var a = game.add.sprite(game.width / 2, 0, "impk", "ui-win1");
        setObjectAnchor(a, .5, 0);
        a.y = (game.height - a.height) / 2;
        this.screenGroup.addChild(a);
        if (GAME_LANGUAGE === LANGUAGE_JA) var b = game.make.text(0, floorNumber(.16 * a.height), gameTexts.textFromID(TEXT_GAME_PAUSED), {
            font: "50px Arial",
            fill: TEXT_BROWN2_COLOR
        });
        else b = game.add.bitmapText(0, floorNumber(.14 * a.height), "gamefont_bmp",
            gameTexts.textFromID(TEXT_GAME_PAUSED), 50), b.tint = TEXT_BROWN2_COLOR2;
        setObjectAnchor(b, .5, .5);
        a.addChild(b);
        var c = Math.floor(.3 * a.width),
            d = Math.floor(.4 * a.height),
            f = Math.floor(.22 * a.height);
        this.btnsList = [];
        this.backButton = guiManager.buttonsCreator.createOneImgButton(c, d, "impk", "buttons_8", this.backClicked, this, !0);
        this.btnsList.push(a.addChild(this.backButton));
        var e = guiManager.buttonsCreator.createOneImgButton(c, d + f, "impk", "buttons_2", this.levelsClicked, this);
        this.btnsList.push(a.addChild(e));
        c =
            guiManager.buttonsCreator.createOneImgButton(c, d + 2 * f, "impk", "buttons_3", this.homeClicked, this);
        this.btnsList.push(a.addChild(c));
        var g = floorNumber(.4 * -a.width);
        this.screenTexts = [];
        GAME_LANGUAGE === LANGUAGE_JA ? c = game.make.text(g, d, gameTexts.textFromID(TEXT_RESUMEGAME), {
            font: "37px Arial",
            fill: TEXT_BROWN_COLOR
        }) : (c = game.add.bitmapText(g, d - 5, "gamefont_bmp", gameTexts.textFromID(TEXT_RESUMEGAME), 37), c.tint = TEXT_BROWN_COLOR2);
        setObjectAnchor(c, 0, .5);
        a.addChild(c);
        this.screenTexts.push(c);
        GAME_LANGUAGE ===
            LANGUAGE_JA ? e = game.make.text(g, d + f, gameTexts.textFromID(TEXT_LEVELS), {
                font: "37px Arial",
                fill: TEXT_BROWN_COLOR
            }) : (e = game.add.bitmapText(g, d + f - 5, "gamefont_bmp", gameTexts.textFromID(TEXT_LEVELS), 37), e.tint = TEXT_BROWN_COLOR2);
        setObjectAnchor(e, 0, .5);
        a.addChild(e);
        this.screenTexts.push(e);
        GAME_LANGUAGE === LANGUAGE_JA ? d = game.make.text(g, d + 2 * f, gameTexts.textFromID(TEXT_HOME), {
            font: "37px Arial",
            fill: TEXT_BROWN_COLOR
        }) : (d = game.add.bitmapText(g, d + 2 * f - 5, "gamefont_bmp", gameTexts.textFromID(TEXT_HOME), 37), d.tint =
            TEXT_BROWN_COLOR2);
        setObjectAnchor(d, 0, .5);
        a.addChild(d);
        this.screenTexts.push(d);
        this.pauseTitle = b;
        this.resumeText = c;
        this.levelsText = e;
        this.homeText = d;
        this.pauseWind = a
    },
    update: function() {},
    backClicked: function() {
        musicPlayer.playSound("clck");
        appState = APP_STATES.GAME_RUNNING;
        guiManager.screenSwitcher_closeOverlayScreen()
    },
    soundToggleClicked: function() {
        musicPlayer.playSound("clck")
    },
    musicToggleClicked: function() {
        musicPlayer.playSound("clck");
        musicPlayer.toggleEnableDisableMusic()
    },
    levelsClicked: function() {
        gamePlay.onGameOver(LEVEL_OVER_EXIT_BY_USER);
        guiManager.screenSwitcher_openNewScreen(guiManager.screenLevelSelection);
        musicPlayer.playSound("clck");
        appState = APP_STATES.MENU
    },
    homeClicked: function() {
        gamePlay.onGameOver(LEVEL_OVER_EXIT_BY_USER);
        guiManager.screenSwitcher_openNewScreen(guiManager.screenMainMenu);
        musicPlayer.playSound("clck");
        appState = APP_STATES.MENU
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        guiManager.showScreenFromBottom(this.screenGroup, !0, 250, 50, Phaser.Easing.Quintic.Out, this)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenToBottom(this.screenGroup, !0, 150, 0, Phaser.Easing.Linear.None, this);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {
        this.pauseTitle.setText(gameTexts.textFromID(TEXT_GAME_PAUSED));
        setObjectAnchor(this.pauseTitle, .5, .5);
        gameTexts.updateTextToWidth(this.pauseTitle, 48, .75 * this.pauseWind.width);
        for (var a = 37, b = 0; b < this.screenTexts.length; b++) gameTexts.updateTextToWidth(this.screenTexts[0],
            a, .58 * this.pauseWind.width), this.screenTexts[b].fontSize < a && (a = this.screenTexts[b].fontSize);
        for (b = 0; b < this.screenTexts.length; b++) this.screenTexts[b].fontSize = a, setObjectAnchor(this.screenTexts[b], 0, .5)
    }
};
var ScreenGameOver = function() {
    this.screenGroup = null;
    this.screenName = "ScreenGameOver"
};
ScreenGameOver.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        this.pauseWind = game.add.sprite(game.width / 2, 0, "impk", "end-win");
        setObjectAnchor(this.pauseWind, .5, 0);
        this.pauseWind.y = Math.floor((game.height - this.pauseWind.height) / 2);
        this.screenGroup.addChild(this.pauseWind);
        GAME_LANGUAGE === LANGUAGE_JA ? (this.lvlComplText = game.make.text(0, Math.floor(.082 * this.pauseWind.height), gameTexts.textFromID(TEXT_LEVELCOMPL), {
            font: "40px Arial",
            fill: TEXT_BROWN_COLOR
        }), this.lvlComplText.maxAvailableWidth = .6 * this.pauseWind.width) : (this.lvlComplText = game.add.bitmapText(0, Math.floor(.06 * this.pauseWind.height), "gamefont_bmp", gameTexts.textFromID(TEXT_LEVELCOMPL), 40), this.lvlComplText.tint = TEXT_BROWN_COLOR2, this.lvlComplText.maxAvailableWidth = .5 * this.pauseWind.width);
        setObjectAnchor(this.lvlComplText, .5, .5);
        this.pauseWind.addChild(this.lvlComplText);
        var a = function(a, c, d, f) {
            a = game.add.sprite(a, c, "impk");
            a.frameName = "bar-mrkva_" + d + "";
            a.scale.set(f);
            setObjectAnchor(a, .5, .5);
            a.finalScale = f;
            this.pauseWind.addChild(a);
            return a
        }.bind(this);
        a(-40, 65, 3, 1);
        a(40, 65, 5, 1);
        a(0, 80, 4, 1);
        this.starsList = [];
        this.starsList.push(a(-40, 65, 0, 1));
        this.starsList.push(a(40, 65, 2, 1));
        this.starsList.push(a(0, 80, 1, 1));
        GAME_LANGUAGE === LANGUAGE_JA ? (this.lvlComplText2 = game.make.text(0, Math.floor(.47 * this.pauseWind.height), gameTexts.textFromID(TEXT_LEVEL) + gameTexts.textFromID(TEXT_COMPLETED), {
                font: "bold 40px Arial",
                fill: TEXT_BROWN2_COLOR
            }), this.lvlComplText2.maxAvailableWidth =
            .7 * this.pauseWind.width) : (this.lvlComplText2 = game.add.bitmapText(0, Math.floor(.45 * this.pauseWind.height), "gamefont_bmp", gameTexts.textFromID(TEXT_LEVEL) + gameTexts.textFromID(TEXT_COMPLETED), 40), this.lvlComplText2.tint = TEXT_BROWN2_COLOR2, this.lvlComplText2.maxAvailableWidth = .5 * this.pauseWind.width);
        setObjectAnchor(this.lvlComplText2, .5, .5);
        this.pauseWind.addChild(this.lvlComplText2);
        GAME_LANGUAGE === LANGUAGE_JA ? (this.carrotsCollectedText = game.make.text(0, Math.floor(.55 * this.pauseWind.height), gameTexts.textFromID(TEXT_CARROTS_COLLECTED) +
            ": 0", {
                font: "bold 40px Arial",
                fill: TEXT_BROWN2_COLOR
            }), this.carrotsCollectedText.maxAvailableWidth = .8 * this.pauseWind.width) : (this.carrotsCollectedText = game.add.bitmapText(0, Math.floor(.52 * this.pauseWind.height), "gamefont_bmp", gameTexts.textFromID(TEXT_CARROTS_COLLECTED) + ": 0", 40), this.carrotsCollectedText.tint = TEXT_BROWN2_COLOR2, this.carrotsCollectedText.maxAvailableWidth = .6 * this.pauseWind.width);
        setObjectAnchor(this.carrotsCollectedText, .5, .5);
        this.pauseWind.addChild(this.carrotsCollectedText);
        a =
            Math.floor(.85 * this.pauseWind.height);
        this.bottomButtons = [];
        this.levelsBtn = guiManager.buttonsCreator.createOneImgButtonWithText(Math.floor(.3 * -this.pauseWind.width), a, "impk", "buttons_2", gameTexts.textFromID(TEXT_LEVELS), TEXT_LEVELS, TEXT_CURRENT_COLOR_BROWN, this.levelsClicked, this);
        this.pauseWind.addChild(this.levelsBtn);
        this.bottomButtons.push(this.levelsBtn);
        this.replayBtn = guiManager.buttonsCreator.createOneImgButtonWithText(0, a, "impk", "buttons_9", gameTexts.textFromID(TEXT_REPLAY), TEXT_REPLAY, TEXT_CURRENT_COLOR_BROWN,
            this.resetBtnClicked, this);
        this.replayBtn.txtt.align = "center";
        GAME_LANGUAGE === LANGUAGE_NL && (this.replayBtn.txtt.y -= 8);
        this.pauseWind.addChild(this.replayBtn);
        this.bottomButtons.push(this.replayBtn);
        this.continueBtn = guiManager.buttonsCreator.createOneImgButtonWithText(Math.floor(.3 * this.pauseWind.width), a, "impk", "buttons_8", gameTexts.textFromID(TEXT_NEXT), TEXT_NEXT, TEXT_CURRENT_COLOR_BROWN, this.continueBtnClicked, this);
        this.pauseWind.addChild(this.continueBtn);
        this.bottomButtons.push(this.continueBtn);
        this.continueBtn.pulseTW = game.add.tween(this.continueBtn.scale).to({
            x: [.95, 1],
            y: [.95, 1]
        }, 700, Phaser.Easing.Linear.None, !1, 0);
        this.continueBtn.pulseTW.onComplete.add(function() {
            this.screenGroup.visible && this.continueBtn.pulseTW.start()
        }, this);
        this.resetScreenTexts()
    },
    update: function() {},
    levelsClicked: function() {
		gradle.event('btn_level');
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenLevelSelection)
    },
    resetBtnClicked: function() {
		gradle.event('btn_restart');
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_closeOverlayScreen();
        gamePlay.prepareNewGame()
    },
    continueBtnClicked: function() {
		gradle.event('btn_continue');
        musicPlayer.playSound("clck");
        !0 === gamePlay.isLastLevel() ? (appState = APP_STATES.MENU, guiManager.screenSwitcher_openNewScreen(guiManager.screenLevelSelection)) : (guiManager.screenSwitcher_closeOverlayScreen(), gamePlay.startFollowingLevel())
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.lvlComplText2.setText(gameTexts.textFromID(TEXT_LEVEL) + " " + (gamePlay.currentLevel + 1) + " " + gameTexts.textFromID(TEXT_COMPLETED));
        gameTexts.updateTextToWidth(this.lvlComplText2,
            40, this.lvlComplText2.maxAvailableWidth);
        setObjectAnchor(this.lvlComplText2, .5, .5);
        this.carrotsCollectedText.setText(gameTexts.textFromID(TEXT_CARROTS_COLLECTED) + ": " + gamePlay.carrotsCollected);
        gameTexts.updateTextToWidth(this.carrotsCollectedText, 40, this.carrotsCollectedText.maxAvailableWidth);
        setObjectAnchor(this.carrotsCollectedText, .5, .5);
        for (var a = 0; a < this.starsList.length; a++) this.starsList[a].visible = !1, removeObjectTweens(this.starsList[a]);
        for (a = 0; a < gamePlay.carrotsCollected; a++) {
            this.starsList[a].visible = !0;
            this.starsList[a].scale.set(0);
            var b = game.add.tween(this.starsList[a].scale).to({
                x: this.starsList[a].finalScale,
                y: this.starsList[a].finalScale
            }, 700, Phaser.Easing.Elastic.Out, !0, 500 + 500 * a);
            b.par = this.starsList[a];
            b.parIdx = a + 1;
            b.onStart.add(function(a, b) {
                guiManager.fireParticle(b.par.worldPosition.x, b.par.worldPosition.y, 3 * b.parIdx, function() {
                    return (.3 + Math.floor(4 * Math.random()) / 100) * (1 + b.parIdx / 2)
                })
            }, this)
        }
        game.time.events.add(500, function() {
            musicPlayer.playSound("sndWin" + gamePlay.carrotsCollected)
        });
        guiManager.showScreenFromLeft(this.screenGroup, !0, 250, 50, Phaser.Easing.Quintic.Out, this)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0);
        this.continueBtn.pulseTW.start()
    },
    hideScreen: function(a) {
        guiManager.hideScreenToRight(this.screenGroup, !0, 150, 0, Phaser.Easing.Linear.None, this);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {
        this.lvlComplText.setText(gameTexts.textFromID(TEXT_LEVELCOMPL));
        gameTexts.updateTextToWidth(this.lvlComplText, 30, this.lvlComplText.maxAvailableWidth);
        setObjectAnchor(this.lvlComplText, .5, .5);
        for (var a = 20, b = 0; b < this.bottomButtons.length; b++) guiManager.buttonsCreator.reloadButtonText(this.bottomButtons[b], a), this.bottomButtons[b].txtt.fontSize < a && (a = this.bottomButtons[b].txtt.fontSize);
        for (b = 0; b < this.bottomButtons.length; b++) this.bottomButtons[b].txtt.fontSize = a
    }
};
var ScreenLevelSelection = function() {
    this.screenGroup = null;
    this.screenName = "ScreenLevelSelection";
    this.lock_y = -5;
    this.carrot_y = 2
};
ScreenLevelSelection.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        var a = game.make.sprite(game.width / 2, game.height, "impk", "gp-bottom");
        a.isClickable = !0;
        a.anchor.set(.5, 1);
        a.visibleY = game.height + .2 * a.height;
        a.hiddenY = game.height + a.height;
        guiManager.addShowTween(a, a, {
            y: a.visibleY
        }, 200, Phaser.Easing.Back.Out, 150, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(a, a, {
            y: a.hiddenY
        }, 200, Phaser.Easing.Quadratic.In, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        var b = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2, game.height - 30, "impk", "buttons_3", gameTexts.textFromID(TEXT_HOME), TEXT_HOME, TEXT_CURRENT_COLOR_WHITE, this.backBtnClicked, this);
        b.visibleY = game.height - 40;
        b.hiddenY = a.hiddenY;
        guiManager.addShowTween(b, b.scale, {
            x: b.maxScaleX
        }, 200, Phaser.Easing.Back.Out, 380, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup,
                this)
        }, this);
        guiManager.addShowTween(b, b.scale, {
            y: b.maxScaleY
        }, 200, Phaser.Easing.Quadratic.Out, 380, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(b, b, {
            y: a.hiddenY
        }, 200, Phaser.Easing.Quadratic.In, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        var c = game.make.sprite(game.width / 2, 0, "impk", "gp-top");
        c.isClickable = !0;
        setObjectAnchor(c, .5, 0);
        c.visibleY = .5 * -c.height;
        c.hiddenY = 0 - c.height;
        var d = game.make.sprite(-160, .7 *
            c.height, "impk", "mrkva-mm");
        d.setScaleMinMax(1, 1, 1, 1);
        setObjectAnchor(d, 1, .5);
        c.addChild(d);
        this.collectedCarrotsCount = game.add.bitmapText(d.x + 20, d.y - 5, "gamefont_bmp", 720, 40);
        this.collectedCarrotsCount.tint = TEXT_BROWN_COLOR2;
        setObjectAnchor(this.collectedCarrotsCount, 0, .5);
        c.addChild(this.collectedCarrotsCount);
        guiManager.addShowTween(c, c, {
            y: c.visibleY
        }, 200, Phaser.Easing.Back.Out, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(c, c, {
                y: c.hiddenY
            },
            200, Phaser.Easing.Quadratic.In, 0, null,
            function() {
                guiManager.checkHideScreenOver(this.screenGroup, this)
            }, this);
        var d = function(a, b, c) {
                a = guiManager.buttonsCreator.createOneImgButton(a, b, "impk", "lvl-back_0", this.levelSelected, this);
                b = game.add.bitmapText(0, -28, "gamefont_bmp", c, 35);
                b.anchor.set(.5);
                a.lvlNumberImg = a.addChild(b);
                a.levelNumber = c;
                c = [-22, 0, 22];
                a.starsList = [];
                for (b = 0; 3 > b; b++) {
                    var d = game.make.sprite(c[b], 2, "impk", "lvl-mrkva_0");
                    setObjectAnchor(d, .5, 0);
                    a.starsList.push(a.addChild(d))
                }
                return a
            }.bind(this),
            f = game.make.group(),
            e = LEVELS_COUNT_PER_GAME_MODE / 4,
            g = 100 + Math.floor((resolutionX - resolutionX_min) / (resolutionX_max - resolutionX_min + 1) * 35),
            k = (game.width - 3 * g) / 2;
        this.tilesOffset_y = 110;
        this.tilesInit_y = 180;
        for (var h = 0; h < e; h++)
            for (var l = 0; 4 > l; l++) {
                var m = d(k + l * g, this.tilesInit_y + h * this.tilesOffset_y, l + 4 * h + 1);
                f.addChild(m)
            }
        f.totalHeight = this.tilesInit_y + e * this.tilesOffset_y;
        guiManager.addShowTween(f, f, {
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup,
                this)
        }, this);
        guiManager.addHideTween(f, f, {
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        this.levelsGroup = this.screenGroup.addChild(f);
        this.topPanel = this.screenGroup.addChild(c);
        this.btmPanel = this.screenGroup.addChild(a);
        this.backBtn = this.screenGroup.addChild(b);
        game.input.onDown.add(this.levelSelectionScreenClickDown, this);
        game.input.onUp.add(this.levelSelectionScreenClickUp, this);
        game.input.mouse.mouseWheelCallback = this.mouseWheelScrolled;
        game.input.mouse.callbackContext = this
    },
    update: function() {
        null !== this.contentMoveType && this.moveScreenContent();
        0 != this.wheelScrolled && (this.wheelScrolled = 0 < this.wheelScrolled && 0 < this.wheelScrolled - 2 ? this.wheelScrolled - 2 : 0 > this.wheelScrolled && 0 > this.wheelScrolled + 2 ? this.wheelScrolled + 2 : 0, this.moveScreenContent())
    },
    mouseWheelScrolled: function() {
        game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP ? 0 < this.wheelScrolled ? 50 > this.wheelScrolled && (this.wheelScrolled += 7) : this.wheelScrolled = 7 : 0 > this.wheelScrolled ?
            -50 < this.wheelScrolled && (this.wheelScrolled -= 7) : this.wheelScrolled = -7
    },
    moveScreenContent: function() {
        var a = 0,
            b;
        0 === this.contentMoveType ? (a = game.input.activePointer.y - this.initClickY, b = this.contentOriginY + a) : 0 !== this.wheelScrolled && (a = this.wheelScrolled, b = this.levelsGroup.y + a, this.contentMoveType = null);
        0 !== a && (this.levelsGroup.y = 0 < b ? 0 : b < 0 - this.levelsGroup.totalHeight + (game.height - 60) ? -this.levelsGroup.totalHeight + (game.height - 60) : b)
    },
    levelSelectionScreenClickDown: function(a) {
        this.screenGroup.visible &&
            (this.initClickY = a.y, this.contentOriginY = this.levelsGroup.y, this.contentMoveType = 0)
    },
    levelSelectionScreenClickUp: function(a) {
        this.touchContentMove = Math.abs(this.initClickY - a.y);
        this.contentMoveType = this.initClickY = null
    },
    levelSelected: function(a) {
        a = a.levelNumber - 1; - 1 === gamePlay.levelsProgress[a] || 15 < this.touchContentMove || (musicPlayer.playSound("clck"), gamePlay.currentLevel = a, gamePlay.prepareNewGame(), guiManager.screenSwitcher_openNewScreen(guiManager.screenGame))
    },
    backBtnClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenMainMenu)
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.collectedCarrotsCount.setText(gamePlay.countCollectedCarrots());
        this.btmPanel.y = void 0 === this.btmPanel.anim || !0 === this.btmPanel.anim ? this.btmPanel.hiddenY : this.btmPanel.visibleY;
        this.topPanel.y = this.topPanel.hiddenY;
        this.levelsGroup.alpha = 0;
        this.levelsGroup.y = 0;
        this.backBtn.alpha = 1;
        this.backBtn.scale.set(0);
        this.backBtn.y = this.backBtn.visibleY;
        this.resetLevelButtons();
        var a = Math.floor(gamePlay.getLevelToPlay() / 4);
        this.levelsGroup.y = -(this.tilesInit_y + a * this.tilesOffset_y) + game.height / 2;
        0 < this.levelsGroup.y ? this.levelsGroup.y = 0 : this.levelsGroup.y < 0 - this.levelsGroup.totalHeight + (game.height - 60) && (this.levelsGroup.y = -this.levelsGroup.totalHeight + (game.height - 60));
        guiManager.showScreenCustomTweens(this.screenGroup)
    },
    resetLevelButtons: function() {
        for (var a = 0; a < this.levelsGroup.length; a++) {
            var b = gamePlay.levelsProgress[a];
            if (-1 === b) {
                this.levelsGroup.getChildAt(a).isClickable = !1;
                0 === (a + 1) % 10 ? this.levelsGroup.getChildAt(a).frameName = "lvl-back_2" : this.levelsGroup.getChildAt(a).frameName = "lvl-back_1";
                this.levelsGroup.getChildAt(a).lvlNumberImg.tint = TEXT_YELLOW_COLOR2;
                for (var c = 0; 3 > c; c++) this.levelsGroup.getChildAt(a).starsList[c].visible = !1;
                this.levelsGroup.getChildAt(a).starsList[1].visible = !0;
                this.levelsGroup.getChildAt(a).starsList[1].frameName = "lvl-kladka";
                this.levelsGroup.getChildAt(a).starsList[1].y = this.lock_y
            } else {
                this.levelsGroup.getChildAt(a).isClickable = !0;
                this.levelsGroup.getChildAt(a).frameName =
                    "lvl-back_0";
                for (c = 0; 3 > c; c++) this.levelsGroup.getChildAt(a).starsList[c].visible = !0, this.levelsGroup.getChildAt(a).starsList[c].frameName = "lvl-mrkva_1", this.levelsGroup.getChildAt(a).starsList[c].y = this.carrot_y;
                for (c = 0; c < b; c++) this.levelsGroup.getChildAt(a).starsList[c].frameName = "lvl-mrkva_0";
                this.levelsGroup.getChildAt(a).lvlNumberImg.tint = TEXT_BROWN2_COLOR2
            }
        }
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0);
        this.setBottomPanelAnim(!0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1;
        this.setBottomPanelAnim(!0)
    },
    resetScreenTexts: function() {
        guiManager.buttonsCreator.reloadButtonText(this.backBtn, 20)
    },
    setBottomPanelAnim: function(a) {
        this.btmPanel.anim = a
    },
    createLevelSelStarBitmap: function(a, b, c) {
        var d = game.add.bitmapData(game.cache.getImage(b).width, game.cache.getImage(b).height);
        b = game.make.sprite(0, 0, b);
        d.draw(b, 0, 0);
        b = [
            [10, 54],
            [34, 54],
            [59, 54]
        ];
        for (var f = game.make.sprite(0, 0, "lvlBtn_star"), e = 0; e < a; e++) d.draw(f, b[e][0], b[e][1]);
        if (null !== c) game.cache.addBitmapData(c, d);
        else return d
    }
};
var ScreenSounds = function() {
    this.screenGroup = null;
    this.screenName = "screenSounds"
};
ScreenSounds.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        var a = guiManager.buttonsCreator.createOneImgButton(0, 37, "impk", "soundbtns_0", this.soundClicked, this, null, [.8, .8]);
        this.btn = this.screenGroup.addChild(a);
        ScreenSounds.positionX_standard = game.width / 2 + 176;
        ScreenSounds.positionX_ingame = game.width / 2 + 125;
        this.btn.x = ScreenSounds.positionX_standard;
        this.btn.alpha = 0;
        game.add.tween(this.btn).to({
            alpha: 1
        }, 250, Phaser.Easing.Linear.None, !0);
        this.setBtnFrame()
    },
    update: function() {},
    soundClicked: function() {
        musicPlayer.playSound("clck");
        musicPlayer.toggleEnableDisableMusic();
        this.setBtnFrame()
    },
    setBtnPosition: function(a) {
        removeObjectTweens(this.btn);
        game.add.tween(this.btn).to({
            x: a
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    },
    setBtnFrame: function() {
        SOUNDS_ENABLED && (this.btn.frameName = musicPlayer.musicON ? "soundbtns_1" : "soundbtns_0")
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        guiManager.showScreenCustomTweens(this.screenGroup)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {}
};
var ScreenLogo = function() {
    this.screenGroup = null;
    this.screenName = "screenLogo"
};
ScreenLogo.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        var a = game.make.sprite(game.width / 2, .27 * game.height);
        setObjectAnchor(a, .5, .5);
        this.gmLogo = this.screenGroup.addChild(a);
        var b = game.make.sprite(-4, -15, "impk", "jazero");
        setObjectAnchor(b, .5, .5);
        a.addChild(b);
        b = game.make.sprite(21, -33, "impk", "zajac-ruka");
        setObjectAnchor(b, 0, .5);
        a.addChild(b);
        this.zajacRuka = b;
        b = game.make.sprite(-3, -57, "impk", "zajac");
        setObjectAnchor(b, .5, .5);
        a.addChild(b);
        b =
            game.make.sprite(-3, 14, "impk", "mrkva");
        setObjectAnchor(b, .5, .5);
        a.addChild(b);
        b = game.make.sprite(0, 64, "impk", "text");
        setObjectAnchor(b, .5, .5);
        a.addChild(b);
        this.nazovHry = b;
        this.logoHeight = game.cache.getFrameByName("impk", "ui-logo").height;
        ScreenLogo.positionY_mainmenu = Math.floor(.27 * game.height);
        ScreenLogo.positionY_about = Math.floor(10 + this.logoHeight / 2);
        this.gmLogo.y = ScreenLogo.positionY_mainmenu
    },
    getLogoHeight: function() {
        return this.logoHeight
    },
    createMoveHandTween: function() {
        0 === getRandomUIntInRange(0,
            1) ? game.add.tween(this.zajacRuka).to({
            angle: [-2, -10, -20, -25, -28, -25, -20, -10, -2, 0]
        }, getRandomUIntInRange(1500, 2E3), Phaser.Easing.Linear.None, !0, 0, 0) : game.add.tween(this.zajacRuka).to({
            angle: [-2, -10, -20, -25, -20, -15, -20, -25, -28, -25, -20, -10, -2, 0]
        }, getRandomUIntInRange(1500, 2E3), Phaser.Easing.Linear.None, !0, 0, 0)
    },
    moveHand: function(a) {
        void 0 == this.tmevent && (void 0 == a && (a = getRandomUIntInRange(2800, 3500)), this.tmevent = game.time.events.add(a, function() {
            this.tmevent = null;
            !1 !== this.playAnim && (this.createMoveHandTween(),
                this.moveHand())
        }, this))
    },
    update: function() {},
    setLogoPosition: function(a) {
        removeObjectTweens(this.gmLogo);
        game.add.tween(this.gmLogo).to({
            y: a
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    },
    showScreen: function() {
        this.playAnim = !0;
        this.moveTW_gamename = game.add.tween(this.nazovHry).to({
            y: [this.nazovHry.y - .5, this.nazovHry.y, this.nazovHry.y + .5, this.nazovHry.y]
        }, getRandomUIntInRange(1500, 2E3), Phaser.Easing.Linear.None, !0, 0, 0);
        this.moveTW_gamename.onComplete.add(function() {
                !0 === this.playAnim && this.moveTW_gamename.start()
            },
            this);
        this.moveHand(500);
        0 < this.gmLogo.alpha || game.add.tween(this.gmLogo).to({
            alpha: 1
        }, 230, Phaser.Easing.Linear.None, !0)
    },
    showScreenOver: function() {},
    hideScreen: function(a) {
        this.playAnim = !1;
        game.time.events.remove(this.tmevent);
        this.tmevent = null;
        game.add.tween(this.gmLogo).to({
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, !0)
    },
    hideScreenOver: function() {},
    resetScreenTexts: function() {}
};
var LEVELS_DIFFICULTIES_COUNT = 1,
    LEVELS_COUNT_PER_GAME_MODE = 80,
    STARS_PER_LEVEL = 3,
    LEVEL_LOCKED = -1,
    LEVEL_UNLOCKED = 0,
    GAME_MODES = {
        YUMMY: "YUMMY",
        CLASSIC: "CLASSIC",
        MOVING: "MOVING"
    },
    ELEMENT_TYPE = {
        EMPTY: 1,
        START: 2,
        END: 3,
        STRAIGHT: 4,
        CORNER: 5
    },
    ELEMENT_ORIENTATION = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3,
        SIDE: 4
    },
    rotationPrefix = ["U", "R", "D", "L"],
    rotationPrefixEnd = ["D", "L", "U", "R"],
    Levels = function() {
        this.levelsDb = {}
    };
Levels.prototype = {
    preload: function() {
        this.loadLevels();
        this.loadHints()
    },
    create: function() {},
    loadLevels: function() {
        var a = {
            dataStr: game.cache.getText("lvlzFile"),
            offset: 0
        };
        this.levelsDb = {};
        this.levelsDb[GAME_MODES.YUMMY] = [];
        for (var b = 0; b < 3 * LEVELS_COUNT_PER_GAME_MODE; b++) {
            var c = this.readLine(a);
            if (0 === b % 3) {
                var d = this.getLevelLineChar(c, 0);
                0 !== d && 1 === d && this.parseYummyLevel(c)
            }
        }
    },
    parseYummyLevel: function(a) {
        var b = {};
        b.size = this.getLevelLineChar(a, 1);
        b.carrotsPositions = [10 * this.getLevelLineChar(a, 2) +
            this.getLevelLineChar(a, 3), 10 * this.getLevelLineChar(a, 4) + this.getLevelLineChar(a, 5), 10 * this.getLevelLineChar(a, 6) + this.getLevelLineChar(a, 7)
        ];
        b.grid = [];
        for (var c = 0; c < b.size; c++) {
            b.grid[c] = [];
            for (var d = 0; d < b.size; d++) {
                var f = {},
                    e = 10 + 3 * (d + b.size * c);
                f.id = this.getLevelLineChar(a, e);
                f.rotation = this.getLevelLineChar(a, e + 1);
                f.isMovable = this.getLevelLineChar(a, e + 2);
                b.grid[c][d] = f
            }
        }
        this.levelsDb[GAME_MODES.YUMMY].push(b)
    },
    parseClassicLevel: function(a) {
        var b = {};
        b.size = this.getLevelLineChar(a, 1);
        b.score_gold =
            10 * this.getLevelLineChar(a, 2) + this.getLevelLineChar(a, 3);
        b.score_silver = 10 * this.getLevelLineChar(a, 4) + this.getLevelLineChar(a, 5);
        b.timeToStart = 10 * this.getLevelLineChar(a, 6) + this.getLevelLineChar(a, 7);
        b.grid = [];
        for (var c = 0; c < b.size; c++) {
            b.grid[c] = [];
            for (var d = 0; d < b.size; d++) {
                var f = {},
                    e = 8 + 3 * (d + b.size * c);
                f.id = this.getLevelLineChar(a, e);
                f.rotation = this.getLevelLineChar(a, e + 1);
                f.isMovable = this.getLevelLineChar(a, e + 2);
                b.grid[c][d] = f
            }
        }
        this.levelsDb[GAME_MODES.CLASSIC].push(b)
    },
    parseMovingLevel: function(a) {
        var b = {};
        b.size = this.getLevelLineChar(a, 1);
        b.score_gold = 10 * this.getLevelLineChar(a, 2) + this.getLevelLineChar(a, 3);
        b.score_silver = 10 * this.getLevelLineChar(a, 4) + this.getLevelLineChar(a, 5);
        b.timeToStart = 10 * this.getLevelLineChar(a, 6) + this.getLevelLineChar(a, 7);
        b.grid = [];
        for (var c = 0; c < b.size; c++) {
            b.grid[c] = [];
            for (var d = 0; d < b.size; d++) {
                var f = {},
                    e = 8 + 3 * (d + b.size * c);
                f.id = this.getLevelLineChar(a, e);
                f.rotation = this.getLevelLineChar(a, e + 1);
                f.isMovable = this.getLevelLineChar(a, e + 2);
                b.grid[c][d] = f
            }
        }
        this.levelsDb[GAME_MODES.MOVING].push(b)
    },
    loadHints: function() {
        for (var a = {
                dataStr: game.cache.getText("hntzFile"),
                offset: 0
            }, b = 0; b < 3 * LEVELS_COUNT_PER_GAME_MODE; b++) {
            var c = [],
                d = this.readLine(a);
            if (0 === b % 3) {
                for (var f = (d.length - 1 - 1) / 3, e = 1, g = 0; g < f; g++) {
                    var k = {};
                    k.who = 10 * this.getLevelLineChar(d, e) + this.getLevelLineChar(d, e + 1);
                    k.where = this.getLevelLineChar(d, e + 2);
                    e += 3;
                    c.push(k)
                }
                this.levelsDb[GAME_MODES.YUMMY][b / 3].hints = c
            }
        }
    },
    getLevelLineChar: function(a, b) {
        return a.charCodeAt(b) - 48
    },
    readLine: function(a) {
        for (var b = ""; a.offset < a.dataStr.length - 1;) {
            var c =
                a.dataStr.charAt(a.offset++);
            if ("\n" == c) break;
            b += c
        }
        return b
    }
};
var GameElements = function() {};
GameElements.prototype = {
    preload: function() {},
    create: function() {},
    getFreeGameElement: function(a, b, c, d, f, e) {
        var g = guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.getFirstDead();
        if (null === g) {
            g = guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.create(-100, -100, "impk", d);
            setObjectAnchor(g, .5, 0);
            g.inputEnabled = !0;
            g.isClickable = !0;
            g.events.onInputDown.add(function() {
                gamePlay.elementPressed(g)
            }, gamePlay);
            g.events.onInputUp.add(function() {
                gamePlay.elementReleased(g)
            }, gamePlay);
            var k = game.make.sprite(0,
                g.height, "impk", "shadow");
            setObjectAnchor(k, .5, 0);
            g.addChild(k)
        }
        g.frameName = d;
        g.isClickable = f;
        g.inputEnabled = f;
        g.elementOrientation = e;
        g.row = a;
        g.col = b;
        g.elementPositionIdx = a * gamePlay.currentLevelSize + b;
        g.elementTypeIdx = c;
        this.setElementPosition(g);
        removeObjectTweens(g);
        g.tileWasUsed = !1;
        g.containCarrot = !1;
        return g
    },
    bringGMEtoTop: function(a) {
        guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.bringToTop(a)
    },
    setElementPosition: function(a, b) {
        var c = this.recalc_getRealXYfrom2Dcoord(a.row, a.col);
        !0 ===
            b ? game.add.tween(a).to({
                x: c.x,
                y: c.y
            }, 100, Phaser.Easing.Sinusoidal.Out, !0) : a.reset(c.x, c.y)
    },
    getElementConnectionsCoords: function(a) {
        var b = [],
            c = function(a, c) {
                b.push({
                    row: a,
                    col: c
                })
            };
        a.elementTypeIdx === ELEMENT_TYPE.START && (a.elementOrientation === ELEMENT_ORIENTATION.UP && c(a.row - 1, a.col), a.elementOrientation === ELEMENT_ORIENTATION.LEFT && c(a.row, a.col - 1), a.elementOrientation === ELEMENT_ORIENTATION.DOWN && c(a.row + 1, a.col), a.elementOrientation === ELEMENT_ORIENTATION.RIGHT && c(a.row, a.col + 1));
        a.elementTypeIdx ===
            ELEMENT_TYPE.END && (a.elementOrientation === ELEMENT_ORIENTATION.UP && c(a.row + 1, a.col), a.elementOrientation === ELEMENT_ORIENTATION.LEFT && c(a.row, a.col + 1), a.elementOrientation === ELEMENT_ORIENTATION.DOWN && c(a.row - 1, a.col), a.elementOrientation === ELEMENT_ORIENTATION.RIGHT && c(a.row, a.col - 1));
        a.elementTypeIdx === ELEMENT_TYPE.CORNER && (a.elementOrientation === ELEMENT_ORIENTATION.UP && (c(a.row + 1, a.col), c(a.row, a.col + 1)), a.elementOrientation === ELEMENT_ORIENTATION.LEFT && (c(a.row - 1, a.col), c(a.row, a.col + 1)), a.elementOrientation ===
            ELEMENT_ORIENTATION.DOWN && (c(a.row - 1, a.col), c(a.row, a.col - 1)), a.elementOrientation === ELEMENT_ORIENTATION.RIGHT && (c(a.row + 1, a.col), c(a.row, a.col - 1)));
        if (a.elementTypeIdx === ELEMENT_TYPE.STRAIGHT) {
            if (a.elementOrientation === ELEMENT_ORIENTATION.UP || a.elementOrientation === ELEMENT_ORIENTATION.DOWN) c(a.row - 1, a.col), c(a.row + 1, a.col);
            if (a.elementOrientation === ELEMENT_ORIENTATION.LEFT || a.elementOrientation === ELEMENT_ORIENTATION.RIGHT) c(a.row, a.col - 1), c(a.row, a.col + 1)
        }
        a = [];
        for (c = 0; c < b.length; c++) 0 <= b[c].row &&
            b[c].row < gamePlay.currentLevelSize && 0 <= b[c].col && b[c].col < gamePlay.currentLevelSize && a.push(b[c]);
        return a
    },
    getCornerElementNextOrientation: function(a, b) {
        if (a === ELEMENT_ORIENTATION.UP) {
            if (b === ELEMENT_ORIENTATION.UP) return ELEMENT_ORIENTATION.RIGHT;
            if (b === ELEMENT_ORIENTATION.LEFT) return ELEMENT_ORIENTATION.DOWN
        }
        if (a === ELEMENT_ORIENTATION.LEFT) {
            if (b === ELEMENT_ORIENTATION.LEFT) return ELEMENT_ORIENTATION.UP;
            if (b === ELEMENT_ORIENTATION.DOWN) return ELEMENT_ORIENTATION.RIGHT
        }
        if (a === ELEMENT_ORIENTATION.DOWN) {
            if (b ===
                ELEMENT_ORIENTATION.DOWN) return ELEMENT_ORIENTATION.LEFT;
            if (b === ELEMENT_ORIENTATION.RIGHT) return ELEMENT_ORIENTATION.UP
        }
        if (a === ELEMENT_ORIENTATION.RIGHT) {
            if (b === ELEMENT_ORIENTATION.RIGHT) return ELEMENT_ORIENTATION.DOWN;
            if (b === ELEMENT_ORIENTATION.UP) return ELEMENT_ORIENTATION.LEFT
        }
    },
    reloadGameElements: function() {
        for (var a = 0; a < guiManager.gameScreenGroup.gameBoardGroup.gmeGroup.length; a++) {
            var b = guiManager.gameScreenGroup.gameBoardGroup.gmeGroup.getChildAt(a);
            this.setElementPosition(b)
        }
    },
    killAllGameElements: function() {
        removeObjectTweens(guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup);
        guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.callAll("kill");
        guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.forEach(function(a) {
            a.inputEnabled = !0;
            void 0 !== a.jumpingIndi && a.jumpingIndi.kill()
        }, this)
    },
    getElementImage: function(a) {
        var b = "";
        if (a.id === ELEMENT_TYPE.START) return b += "greywood_start_" + rotationPrefix[a.rotation], b + "";
        if (a.id === ELEMENT_TYPE.END) return b += "redwood_goal_" + rotationPrefixEnd[a.rotation], b += "";
        b = 1 === a.isMovable ? b + "wood_" : b + "greywood_";
        a.id === ELEMENT_TYPE.EMPTY &&
            (b += "base", 1 === a.isMovable && (b += getRandomUIntInRange(1, 2)));
        if (a.id === ELEMENT_TYPE.STRAIGHT) {
            b += "line_";
            if (a.rotation === ELEMENT_ORIENTATION.UP || a.rotation === ELEMENT_ORIENTATION.DOWN) b += "V";
            if (a.rotation === ELEMENT_ORIENTATION.LEFT || a.rotation === ELEMENT_ORIENTATION.RIGHT) b += "H"
        }
        a.id === ELEMENT_TYPE.CORNER && (b += "turn_", a.rotation === ELEMENT_ORIENTATION.UP && (b += "DR"), a.rotation === ELEMENT_ORIENTATION.RIGHT && (b += "DL"), a.rotation === ELEMENT_ORIENTATION.DOWN && (b += "UL"), a.rotation === ELEMENT_ORIENTATION.LEFT &&
            (b += "UR"));
        return b += ""
    },
    getGoalIndicator: function(a) {
        void 0 === a.jumpingIndi && (a.jumpingIndi = a.addChild(this.createJumpingIndicator()));
        this.renewJumpingIndicator(a.jumpingIndi, "gp-target-shadow", "gp-target")
    },
    getMrkvu: function(a) {
        void 0 === a.jumpingIndi && (a.jumpingIndi = a.addChild(this.createJumpingIndicator()));
        this.renewJumpingIndicator(a.jumpingIndi, "gp-mrkva-shadow", "gp-mrkva")
    },
    createJumpingIndicator: function() {
        var a = game.make.sprite(0, .5 * GAME_TILE_HEIGHT, "impk", "1px_empty"),
            b = game.make.sprite(0,
                0, "impk", "1px_empty");
        b.scale.set(1);
        a.addChild(b);
        b = game.make.sprite(0, 0, "impk", "1px_empty");
        b.y_top = Math.floor(.5 * -GAME_TILE_HEIGHT + .31 * GAME_TILE_HEIGHT);
        b.y_bot = Math.floor(.5 * -GAME_TILE_HEIGHT + .52 * GAME_TILE_HEIGHT);
        b.y = b.y_bot;
        a.addChild(b);
        return a
    },
    renewJumpingIndicator: function(a, b, c) {
        a.revive();
        a.scale.set(1);
        a.alpha = 1;
        a.getChildAt(0).frameName = b;
        setObjectAnchor(a.getChildAt(0), .5, .5);
        a.getChildAt(1).frameName = c;
        setObjectAnchor(a.getChildAt(1), .5, .88);
        a.scaleObj = {
            x: 0
        };
        game.add.tween(a.scaleObj).to({
                x: 1
            },
            800, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0).onUpdateCallback(function(b, c, e) {
            a.getChildAt(0).scale.set(1 - .3 * b.target.x);
            a.getChildAt(1).y = a.getChildAt(1).y_bot - (a.getChildAt(1).y_bot - a.getChildAt(1).y_top) * b.target.x
        });
        a.twnRunning = !1
    },
    recalc_getRealXYfrom2Dcoord: function(a, b) {
        return {
            x: GAME_TILE_WIDTH / 2 + b * (GAME_TILE_WIDTH + GAME_TILE_OFFSET),
            y: a * (GAME_TILE_HEIGHT + GAME_TILE_OFFSET)
        }
    },
    recalc_getCOLFromRealX: function(a, b) {
        var c = (a - GAME_TILE_WIDTH / 2) / (GAME_TILE_WIDTH + GAME_TILE_OFFSET);
        return !0 === b ? Math.round(c) :
            c
    },
    recalc_getROWFromRealY: function(a, b) {
        var c = a / (GAME_TILE_HEIGHT + GAME_TILE_OFFSET);
        return !0 === b ? Math.round(c) : c
    }
};
var PAJKO_MOVEMENT_STEP = 1.25,
    PAJKO_TEXTURE_TYPE = {
        STAND: "stand",
        RUN: "run",
        EAT: "eat"
    },
    Pajko = function() {
        this.currentPajkoOrientation = ELEMENT_ORIENTATION.DOWN;
        this.move = !1;
        this.lastPajkoUpdateCoords = [-1, -1];
        this.previousPajkoOrientation = 0;
        this.elementUnderPajko = ELEMENT_TYPE.START;
        this.cornerOrientations = null
    };
Pajko.prototype = {
    preload: function() {},
    create: function() {
        this.pajkoParent = game.add.sprite(0, 0, "impk", "gp-zaj-shadow");
        this.pajkoParent.scale.set(.4);
        setObjectAnchor(this.pajkoParent, .5, .5);
        this.pajkoParent.visible = !1;
        this.pajkoImg = game.add.sprite(0, 0, "impk", "gp-zaj-down-eat_0");
        setObjectAnchor(this.pajkoImg, .5, .91);
        this.pajkoParent.addChild(this.pajkoImg);
        this.pajkoImg.animations.add("walk_" + ELEMENT_ORIENTATION.DOWN, ["gp-zaj-down-run_0", "gp-zaj-down-run_1", "gp-zaj-down-run_2", "gp-zaj-down-run_1"],
            10, !0);
        this.pajkoImg.animations.add("walk_" + ELEMENT_ORIENTATION.UP, ["gp-zaj-up-run_0", "gp-zaj-up-run_1", "gp-zaj-up-run_2", "gp-zaj-up-run_1"], 10, !0);
        this.pajkoImg.animations.add("walk_" + ELEMENT_ORIENTATION.SIDE, ["gp-zaj-side-run_0", "gp-zaj-side-run_1", "gp-zaj-side-run_2", "gp-zaj-side-run_1"], 10, !0);
        var a = [];
        a.push(this.pajkoImg.animations.add("eat_" + ELEMENT_ORIENTATION.DOWN, "gp-zaj-down-eat_1 gp-zaj-down-eat_2 gp-zaj-down-eat_3 gp-zaj-down-eat_2 gp-zaj-down-eat_1 gp-zaj-down-eat_0".split(" "), 50));
        a.push(this.pajkoImg.animations.add("eat_" + ELEMENT_ORIENTATION.UP, "gp-zaj-up-eat_1 gp-zaj-up-eat_2 gp-zaj-up-eat_3 gp-zaj-up-eat_2 gp-zaj-up-eat_1 gp-zaj-up-eat_0".split(" "), 50));
        a.push(this.pajkoImg.animations.add("eat_" + ELEMENT_ORIENTATION.SIDE, "gp-zaj-side-eat_1 gp-zaj-side-eat_2 gp-zaj-side-eat_3 gp-zaj-side-eat_2 gp-zaj-side-eat_1 gp-zaj-side-eat_0".split(" "), 50));
        for (var b = 0; b < a.length; b++) a[b].onComplete.add(function() {
            this.setPajkoTexture(this.currentPajkoOrientation, PAJKO_TEXTURE_TYPE.RUN);
            this.animWalkPlay(this.currentPajkoOrientation)
        }, this);
        guiManager.screenGame.screenGroup.gameBoardGroup.pajkoGroup.addChild(this.pajkoParent)
    },
    update: function() {
        if (!1 !== this.move)
            for (var a = 0; a < Math.floor(GAME_MAX_FPS / GAME_AVERAGE_FPS * 2) && !1 !== this.move; a++) this.updateMovement()
    },
    preparePajko: function(a) {
        this.previousPajkoOrientation = this.currentPajkoOrientation = a;
        this.elementUnderPajko = ELEMENT_TYPE.START;
        this.lastPajkoUpdateCoords = [-1, -1];
        0 > this.pajkoParent.scale.x && (this.pajkoParent.scale.x *= -1);
        this.pajkoParent.scale.set(.4);
        this.setPajkoTexture(a, PAJKO_TEXTURE_TYPE.RUN, 1);
        this.pajkoParent.reset(gamePlay.pathBeginElement.x, gamePlay.pathBeginElement.y + .5 * GAME_TILE_HEIGHT)
    },
    initPajkoMovement: function() {
        this.pajkoParent.scale.x = 0 > this.pajkoParent.scale.x ? -.8 : .8;
        this.pajkoParent.scale.y = .8;
        this.move = !0;
        this.animWalkPlay(this.currentPajkoOrientation)
    },
    pajkoReachEnd: function() {
        appState = APP_STATES.GAME_OVER;
        this.move = !1;
        this.pajkoImg.animations.stop();
        this.setPajkoTexture(this.currentPajkoOrientation,
            PAJKO_TEXTURE_TYPE.RUN, 1);
        gamePlay.GameOver()
    },
    updateMovement: function() {
        var a = gameElements.recalc_getCOLFromRealX(this.pajkoParent.x),
            b = gameElements.recalc_getROWFromRealY(this.pajkoParent.y),
            c = Math.round(a),
            d = Math.floor(b);
        this.checkNewElement(d, c);
        var f = this.elementUnderPajko.elementTypeIdx;
        gamePlay.currentGameMode === GAME_MODES.YUMMY && !0 === gamePlay.gameBoard[d][c].containCarrot && (game.add.tween(gamePlay.gameBoard[d][c].jumpingIndi).to({
            alpha: 0
        }, 150, Phaser.Easing.Linear.None, !0), gamePlay.gameBoard[d][c].containCarrot = !1, gamePlay.carrotsCollected++, this.pajkoImg.animations.stop("walk"), this.setPajkoTexture(this.currentPajkoOrientation, PAJKO_TEXTURE_TYPE.EAT), this.animEatPlay(this.currentPajkoOrientation), musicPlayer.playSound("sndEat"));
        d === gamePlay.currentLevel_pathCoords[gamePlay.currentLevel_pathCoords.length - 2].row && c === gamePlay.currentLevel_pathCoords[gamePlay.currentLevel_pathCoords.length - 2].col && (c = gamePlay.currentLevel_pathCoords[gamePlay.currentLevel_pathCoords.length - 1].row, d = gamePlay.currentLevel_pathCoords[gamePlay.currentLevel_pathCoords.length -
            1].col, !1 === gamePlay.gameBoard[c][d].jumpingIndi.twnRunning && (removeObjectTweens(gamePlay.gameBoard[c][d].jumpingIndi), game.add.tween(gamePlay.gameBoard[c][d].jumpingIndi.scale).to({
            x: 0,
            y: 0
        }, 400, Phaser.Easing.Back.In, !0, 350), gamePlay.gameBoard[c][d].jumpingIndi.twnRunning = !0));
        f === ELEMENT_TYPE.CORNER && (null === this.cornerOrientations && (this.cornerOrientations = [this.currentPajkoOrientation, gameElements.getCornerElementNextOrientation(this.elementUnderPajko.elementOrientation, this.currentPajkoOrientation)]),
            this.currentPajkoOrientation === ELEMENT_ORIENTATION.LEFT ? .51 > (a + .5) % 1 && this.setNewPajkoOrientation(this.cornerOrientations[1]) : this.currentPajkoOrientation === ELEMENT_ORIENTATION.RIGHT ? .49 < (a + .5) % 1 && this.setNewPajkoOrientation(this.cornerOrientations[1]) : this.currentPajkoOrientation === ELEMENT_ORIENTATION.UP ? .48 > b % 1 && this.setNewPajkoOrientation(this.cornerOrientations[1]) : this.currentPajkoOrientation === ELEMENT_ORIENTATION.DOWN && .48 < b % 1 && this.setNewPajkoOrientation(this.cornerOrientations[1]));
        f === ELEMENT_TYPE.END &&
            (this.currentPajkoOrientation === ELEMENT_ORIENTATION.LEFT ? .56 > (a + .5) % 1 && this.pajkoReachEnd() : this.currentPajkoOrientation === ELEMENT_ORIENTATION.RIGHT ? .44 < (a + .5) % 1 && this.pajkoReachEnd() : this.currentPajkoOrientation === ELEMENT_ORIENTATION.UP ? .52 > b % 1 && this.pajkoReachEnd() : this.currentPajkoOrientation === ELEMENT_ORIENTATION.DOWN && .44 < b % 1 && this.pajkoReachEnd());
        this.currentPajkoOrientation === ELEMENT_ORIENTATION.LEFT ? this.pajkoParent.x -= PAJKO_MOVEMENT_STEP : this.currentPajkoOrientation === ELEMENT_ORIENTATION.RIGHT ?
            this.pajkoParent.x += PAJKO_MOVEMENT_STEP : this.currentPajkoOrientation === ELEMENT_ORIENTATION.UP ? this.pajkoParent.y -= PAJKO_MOVEMENT_STEP : this.currentPajkoOrientation === ELEMENT_ORIENTATION.DOWN && (this.pajkoParent.y += PAJKO_MOVEMENT_STEP);
        musicPlayer.playStepSound()
    },
    checkNewElement: function(a, b) {
        if (this.lastPajkoUpdateCoords[0] !== a || this.lastPajkoUpdateCoords[1] !== b) this.lastPajkoUpdateCoords = [a, b], this.elementUnderPajko = gamePlay.gameBoard[a][b], this.cornerOrientations = null
    },
    setNewPajkoOrientation: function(a) {
        this.currentPajkoOrientation =
            a;
        this.currentPajkoOrientation !== this.previousPajkoOrientation && (this.previousPajkoOrientation = this.currentPajkoOrientation, this.setPajkoTexture(a, PAJKO_TEXTURE_TYPE.RUN))
    },
    setPajkoTexture: function(a, b, c) {
        void 0 == c && (c = 0);
        0 > this.pajkoParent.scale.x && (this.pajkoParent.scale.x *= -1);
        a === ELEMENT_ORIENTATION.DOWN ? this.pajkoImg.frameName = "gp-zaj-down-" + b + "_" + c + "" : a === ELEMENT_ORIENTATION.UP ? this.pajkoImg.frameName = "gp-zaj-up-" + b + "_" + c + "" : a === ELEMENT_ORIENTATION.LEFT ? (this.pajkoImg.frameName = "gp-zaj-side-" +
            b + "_" + c + "", this.pajkoParent.scale.x *= -1) : a === ELEMENT_ORIENTATION.RIGHT && (this.pajkoImg.frameName = "gp-zaj-side-" + b + "_" + c + "");
        !0 === this.move && b === PAJKO_TEXTURE_TYPE.RUN && this.animWalkPlay(this.currentPajkoOrientation)
    },
    animWalkPlay: function(a) {
        if (a === ELEMENT_ORIENTATION.LEFT || a === ELEMENT_ORIENTATION.RIGHT) a = ELEMENT_ORIENTATION.SIDE;
        this.pajkoImg.animations.play("walk_" + a)
    },
    animEatPlay: function(a) {
        if (a === ELEMENT_ORIENTATION.LEFT || a === ELEMENT_ORIENTATION.RIGHT) a = ELEMENT_ORIENTATION.SIDE;
        this.pajkoImg.animations.play("eat_" +
            a)
    }
};
var levels = new Levels,
    gameElements = new GameElements,
    MOVEMENT_DIRECTIONS = {
        VERTICAL: "V",
        HORIZONTAL: "H"
    },
    INITIAL_MOVEMENT_OFFSET = 7,
    GAME_TILE_WIDTH = 92,
    GAME_TILE_HEIGHT = 82,
    GAME_TILE_OFFSET = 0,
    GAME_TILE_EMPTY = -1,
    HINT_COUNT_MAX = 10,
    HINT_TIME_TILL_NEXT_MAX = 600,
    GamePlay = function() {
        this.currentGameMode = GAME_MODES.YUMMY;
        this.currentLevelSize = this.currentLevel = 0;
        this.pathBeginElement = null;
        this.currentLevel_pathCoords = [];
        this.selectedGameElement = null;
        this.inputInitCursorPos = {};
        this.inputInitCursorPos2 = {};
        this.gameBoard = [];
        this.previousInput = null;
        this.movesHistoryList = [];
        this.movesCount = 0;
        this.levelsProgress = [];
        this.isGameOver = !1;
        this.gameOverElement = null;
        this.hintCount = 5;
        this.hintRunning = !1;
        this.hintsList = [];
        this.hintCurrentMoveIdx = -1;
        this.hint_timeTillNext = HINT_TIME_TILL_NEXT_MAX;
        this.movementDirection = null;
        this.pajko = new Pajko;
        this.carrotsCollected = 0
    };
GamePlay.prototype = {
    constructor: GamePlay,
    preload: function() {
        levels.preload();
        this.initSavedLevelsProgress()
    },
    create: function() {
        levels.create();
        this.pajko.create()
    },
    prepareNewGame: function() {
        this.clearGame();
        this.isGameOver = !1;
        this.gameOverElement = null;
        this.hintRunning = !1;
        this.hintsList = [];
        this.hintCurrentMoveIdx = -1;
        this.pajko.move = !1;
        appState = APP_STATES.GAME_START;
        this.currentLevelSize = levels.levelsDb[this.currentGameMode][this.currentLevel].size;
        for (var a = 0; a < this.currentLevelSize; a++) {
            this.gameBoard[a] = [];
            for (var b = 0; b < this.currentLevelSize; b++) this.gameBoard[a][b] = GAME_TILE_EMPTY
        }
        this.movesHistoryList = [];
        this.movesCount = 0;
        this.pathBeginElement = this.movementDirection = null;
        this.currentLevel_pathCoords = [];
        guiManager.screenGame.showStars(this.levelsProgress[this.currentLevel]);
        guiManager.screenGame.hintHide();
        guiManager.screenGame.resetUndoResetHintButtons();
        this.loadLevel();
        for (a = 0; a < this.currentLevelSize; a++)
            for (b = 0; b < this.currentLevelSize; b++) this.gameBoard[a][b].elementTypeIdx === ELEMENT_TYPE.START &&
                (this.pathBeginElement = this.gameBoard[a][b]), this.gameBoard[a][b].elementTypeIdx === ELEMENT_TYPE.END && gameElements.getGoalIndicator(this.gameBoard[a][b]);
        if (this.currentGameMode === GAME_MODES.YUMMY)
            for (a = levels.levelsDb[gamePlay.currentGameMode][gamePlay.currentLevel].carrotsPositions, b = 0; b < a.length; b++) {
                var c = this.recalc1DArrayPos22DArrayPos(a[b]);
                gameElements.getMrkvu(this.gameBoard[c.row][c.col]);
                this.gameBoard[c.row][c.col].containCarrot = !0
            }
        this.carrotsCollected = 0;
        this.pajko.preparePajko(this.pathBeginElement.elementOrientation);
        guiManager.screenGame.resetScreenContent();
        this.startNewGame()
    },
    startNewGame: function() {
        game.paused = !1;
		analyticsOnLevelStartEvent(this.currentLevel + 1);
		appState = APP_STATES.GAME_RUNNING;
		0 === this.currentLevel && this.startHintNoQuestion();
    },
    startFollowingLevel: function() {
        this.currentLevel++;
        this.prepareNewGame()
    },
    update: function() {
        this.updateGameElementPosition();
        this.pajko.update();
        this.hint_update()
    },
    elementPressed: function(a, b) {
        appState === APP_STATES.GAME_RUNNING && (logToConsole("element pressed, ingame idx:", a.elementPositionIdx), this.selectedGameElement = a, this.inputInitCursorPos = {
            x: game.input.x,
            y: game.input.y
        }, this.selectedGameElement.origCoords = {
            x: this.selectedGameElement.x,
            y: this.selectedGameElement.y
        }, this.selectedGameElement.origRowCol = {
            row: this.selectedGameElement.row,
            col: this.selectedGameElement.col
        }, this.selectedGameElement.availablePositions = {
            "c-1": this.isBoardTileFree(this.selectedGameElement.col -
                1, this.selectedGameElement.row),
            "c+1": this.isBoardTileFree(this.selectedGameElement.col + 1, this.selectedGameElement.row),
            "r-1": this.isBoardTileFree(this.selectedGameElement.col, this.selectedGameElement.row - 1),
            "r+1": this.isBoardTileFree(this.selectedGameElement.col, this.selectedGameElement.row + 1)
        }, this.previousInput = {
            x: game.input.x,
            y: game.input.y
        })
    },
    elementReleased: function() {
        if (appState === APP_STATES.GAME_RUNNING && null !== this.selectedGameElement) {
            logToConsole("element released");
            if (null !== this.movementDirection)
                if (this.movementDirection ===
                    MOVEMENT_DIRECTIONS.HORIZONTAL) {
                    var a = game.input.x - this.inputInitCursorPos2.x;
                    0 > a && !1 === this.selectedGameElement.availablePositions["c-1"] && (a = 0);
                    0 < a && !1 === this.selectedGameElement.availablePositions["c+1"] && (a = 0);
                    var b = 0 > a ? -1 : 1;
                    Math.abs(a) > GAME_TILE_WIDTH && (a = GAME_TILE_WIDTH * b);
                    Math.abs(a) > 1.5 * INITIAL_MOVEMENT_OFFSET && (this.selectedGameElement.col += b)
                } else a = game.input.y - this.inputInitCursorPos2.y, 0 > a && !1 === this.selectedGameElement.availablePositions["r-1"] && (a = 0), 0 < a && !1 === this.selectedGameElement.availablePositions["r+1"] &&
                    (a = 0), b = 0 > a ? -1 : 1, Math.abs(a) > GAME_TILE_WIDTH && (a = GAME_TILE_WIDTH * b), Math.abs(a) > 1.5 * INITIAL_MOVEMENT_OFFSET && (this.selectedGameElement.row += b);
            this.hintRunning && (this.hintsList[this.hintCurrentMoveIdx].row_final !== this.selectedGameElement.row || this.hintsList[this.hintCurrentMoveIdx].col_final !== this.selectedGameElement.col ? (this.selectedGameElement.row = this.selectedGameElement.origRowCol.row, this.selectedGameElement.col = this.selectedGameElement.origRowCol.col) : this.hint_nextStart());
            this.selectedGameElement.origRowCol.row ===
                this.selectedGameElement.row && this.selectedGameElement.origRowCol.col === this.selectedGameElement.col || musicPlayer.playSound("sndTileMove" + getRandomUIntInRange(1, 3), !0);
            this.updateGameElementPlaceInBoard(this.selectedGameElement);
            this.resetGameBoardZcoords();
            gameElements.setElementPosition(this.selectedGameElement, !0);
            this.undoRecordAdd(this.selectedGameElement);
            this.selectedGameElement.origCoords = {};
            this.selectedGameElement.origRowCol = {};
            this.inputInitCursorPos = {};
            this.inputInitCursorPos2 = {};
            this.selectedGameElement =
                this.movementDirection = this.previousInput = null;
            !0 === this.checkLevelPath() && this.pathCompleted()
        }
    },
    undoRecordAdd: function(a) {
        a.origRowCol.row === a.row && a.origRowCol.col === a.col || this.movesHistoryList.push({
            gme_idx: a.elementPositionIdx,
            row_orig: a.origRowCol.row,
            col_orig: a.origRowCol.col,
            row_final: a.row,
            col_final: a.col
        })
    },
    undoMove: function() {
        if (!0 !== this.hintRunning && !(0 >= this.movesHistoryList.length)) {
            var a = this.movesHistoryList.pop();
            guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.forEachAlive(function(b) {
                b.elementPositionIdx ===
                    a.gme_idx && (b.row = a.row_orig, b.col = a.col_orig, gameElements.setElementPosition(b, !0), this.updateGameElementPlaceInBoard(b), this.resetGameBoardZcoords())
            }, this)
        }
    },
    getLevelCompletedState: function(a) {
        return this.levelsProgress[a][LEVEL_DATA_STARS_IDX]
    },
    initSavedLevelsProgress: function() {
        for (var a = 0; a < LEVELS_DIFFICULTIES_COUNT * LEVELS_COUNT_PER_GAME_MODE; a++) void 0 === this.levelsProgress[a] && (this.levelsProgress[a] = LEVEL_LOCKED);
        this.levelsProgress[0] === LEVEL_LOCKED && (this.levelsProgress[0] = LEVEL_UNLOCKED)
    },
    clearGame: function() {
        gameElements.killAllGameElements();
        this.selectedGameElement = null;
        this.inputInitCursorPos = {};
        this.inputInitCursorPos2 = {};
        this.gameBoard = []
    },
    loadLevel: function() {
        for (var a = 0; a < this.currentLevelSize; a++)
            for (var b = 0; b < this.currentLevelSize; b++) {
                var c = levels.levelsDb[this.currentGameMode][this.currentLevel].grid[a][b];
                if (0 !== c.id) {
                    var d = gameElements.getElementImage(c),
                        c = gameElements.getFreeGameElement(a, b, c.id, d, 1 === c.isMovable, c.rotation);
                    this.updateGameElementPlaceInBoard(c)
                }
            }
        this.resetGameBoardZcoords()
    },
    checkLevelPath: function() {
        logToConsole("---------- checkLevelPath ----------");
        var a = 0,
            b = [],
            c = function() {
                if (0 === d.connectionz.length) return !1;
                f = this.gameBoard[d.connectionz[0].row][d.connectionz[0].col];
                if (f === GAME_TILE_EMPTY) return !1;
                f.connectionz = gameElements.getElementConnectionsCoords(this.gameBoard[d.connectionz[0].row][d.connectionz[0].col]);
                for (var a = !1, b = 0; b < f.connectionz.length; b++)
                    if (f.connectionz[b].row === d.row && f.connectionz[b].col === d.col) {
                        a = b;
                        break
                    }
                if (!1 !== a) f.connectionz.splice(a, 1);
                else return !1;
                if (f.elementTypeIdx === ELEMENT_TYPE.END) return !0;
                d = f;
                f = null
            }.bind(this),
            d = this.pathBeginElement;
        d.connectionz = gameElements.getElementConnectionsCoords(d);
        var f = null,
            e = !1;
        do a++, b.push({
            row: d.row,
            col: d.col
        }), e = c(); while (!1 !== e && !0 !== e);
        if (!1 === e) return logToConsole("cesta nema konca"), !1;
        b.push({
            row: f.row,
            col: f.col
        });
        for (a = 0; a < b.length; a++) this.gameBoard[b[a].row][b[a].col].tileWasUsed = !0;
        this.currentLevel_pathCoords = b;
        logToConsole("path compleeeeeete!!!!!!!!", JSON.stringify(b));
        return !0
    },
    pathCompleted: function() {
        appState = APP_STATES.GAME_PATH_COMPLETED;
        this.hintRunning && guiManager.screenGame.hintHide();
        this.pajko.initPajkoMovement();
        guiManager.screenGame.showPathCompleteText();
        logToConsole("pathCompleted")
    },
    setGameBoardTile: function(a, b, c) {
        0 > b || 0 > a || b >= this.currentLevelSize || a >= this.currentLevelSize || (this.gameBoard[b][a] = c)
    },
    clearElementFromGameBoard: function(a) {
        for (var b = 0; b < this.currentLevelSize; b++)
            for (var c = 0; c < this.currentLevelSize; c++) this.gameBoard[b][c] !== GAME_TILE_EMPTY &&
                this.gameBoard[b][c].elementPositionIdx === a.elementPositionIdx && (this.gameBoard[b][c] = GAME_TILE_EMPTY)
    },
    isBoardTileFree: function(a, b) {
        return 0 > b || 0 > a || b >= this.currentLevelSize || a >= this.currentLevelSize ? !1 : this.gameBoard[b][a] === GAME_TILE_EMPTY ? !0 : !1
    },
    resetGameBoardZcoords: function() {
        for (var a = 0; a < this.currentLevelSize; a++)
            for (var b = 0; b < this.currentLevelSize; b++) this.gameBoard[a][b] !== GAME_TILE_EMPTY && gameElements.bringGMEtoTop(this.gameBoard[a][b])
    },
    updateGameElementPlaceInBoard: function(a) {
        this.clearElementFromGameBoard(a);
        this.setGameBoardTile(a.col, a.row, a)
    },
    updateGameElementPosition: function() {
        if (appState === APP_STATES.GAME_RUNNING && null !== this.selectedGameElement && (this.previousInput.x !== game.input.x || this.previousInput.y !== game.input.y))
            if (this.previousInput = {
                    x: game.input.x,
                    y: game.input.y
                }, null === this.movementDirection) {
                if (Math.abs(this.inputInitCursorPos.x - game.input.x) > INITIAL_MOVEMENT_OFFSET) {
                    if (!1 === this.selectedGameElement.availablePositions["c-1"] && !1 === this.selectedGameElement.availablePositions["c+1"]) {
                        logToConsole("neda sa nastavit horizontal");
                        return
                    }
                    this.movementDirection = MOVEMENT_DIRECTIONS.HORIZONTAL;
                    this.inputInitCursorPos2 = {
                        x: game.input.x,
                        y: this.inputInitCursorPos.y
                    }
                }
                Math.abs(this.inputInitCursorPos.y - game.input.y) > INITIAL_MOVEMENT_OFFSET && (!1 === this.selectedGameElement.availablePositions["r-1"] && !1 === this.selectedGameElement.availablePositions["r+1"] ? logToConsole("neda sa nastavit vertical") : (this.movementDirection = MOVEMENT_DIRECTIONS.VERTICAL, this.inputInitCursorPos2 = {
                    x: this.inputInitCursorPos.x,
                    y: game.input.y
                }))
            } else {
                if (this.movementDirection ===
                    MOVEMENT_DIRECTIONS.HORIZONTAL) {
                    var a = game.input.x - this.inputInitCursorPos2.x;
                    0 > a && !1 === this.selectedGameElement.availablePositions["c-1"] && (a = 0);
                    0 < a && !1 === this.selectedGameElement.availablePositions["c+1"] && (a = 0);
                    Math.abs(a) > GAME_TILE_WIDTH && (a = GAME_TILE_WIDTH * (0 > a ? -1 : 1));
                    this.selectedGameElement.reset(this.selectedGameElement.origCoords.x + a, this.selectedGameElement.y)
                } else a = game.input.y - this.inputInitCursorPos2.y, 0 > a && !1 === this.selectedGameElement.availablePositions["r-1"] && (a = 0), 0 < a && !1 === this.selectedGameElement.availablePositions["r+1"] &&
                    (a = 0), Math.abs(a) > GAME_TILE_WIDTH && (a = GAME_TILE_WIDTH * (0 > a ? -1 : 1)), this.selectedGameElement.reset(this.selectedGameElement.x, this.selectedGameElement.origCoords.y + a);
                Math.abs(a) > 2 * INITIAL_MOVEMENT_OFFSET && this.elementReleased()
            }
    },
    GameOver: function(a) {
        logToConsole("GameOver(), vitaj v cieli");
        a = this.levelsProgress[this.currentLevel];
        this.carrotsCollected > this.levelsProgress[this.currentLevel] && (this.levelsProgress[this.currentLevel] = this.carrotsCollected);
        this.unlockNextLevel();
        a === LEVEL_UNLOCKED &&
            0 === (this.currentLevel + 1) % 10 && (this.hintCount++, guiManager.screenGame.setHintButtonText(this.hintCount, this.hint_timeTillNext), guiManager.screenGame.unLockHintButton());
        saveAllGameData();
        guiManager.screenSwitcher_openOverlayScreen(guiManager.screenGameOver);
        this.onGameOver(LEVEL_OVER)
    },
    onGameOver: function(a) {
        this.countCollectedCarrots();
        this.showAdvert()
    },
    showAdvert: function() {},
    unlockNextLevel: function() {
        this.levelsProgress.length > this.currentLevel + 1 && this.levelsProgress[this.currentLevel + 1] === LEVEL_LOCKED &&
            (this.levelsProgress[this.currentLevel + 1] = LEVEL_UNLOCKED)
    },
    getLevelToPlay: function() {
        for (var a = 0; a < LEVELS_DIFFICULTIES_COUNT * LEVELS_COUNT_PER_GAME_MODE; a++)
            if (gamePlay.levelsProgress[a] === LEVEL_LOCKED) return a - 1;
        for (a = 0; a < LEVELS_DIFFICULTIES_COUNT * LEVELS_COUNT_PER_GAME_MODE; a++)
            if (0 === gamePlay.levelsProgress[a]) return a;
        for (a = 0; a < LEVELS_DIFFICULTIES_COUNT * LEVELS_COUNT_PER_GAME_MODE; a++)
            if (1 === gamePlay.levelsProgress[a]) return a;
        for (a = 0; a < LEVELS_DIFFICULTIES_COUNT * LEVELS_COUNT_PER_GAME_MODE; a++)
            if (2 ===
                gamePlay.levelsProgress[a]) return a;
        return 0
    },
    countCollectedCarrots: function() {
        for (var a = 0, b = 0; b < LEVELS_COUNT_PER_GAME_MODE; b++) {
            var c = this.levelsProgress[b];
            0 < c && (a += c)
        }
        return a
    },
    isLastLevel: function() {
        return gamePlay.currentLevel === LEVELS_COUNT_PER_GAME_MODE - 1
    },
    recalc1DArrayPos22DArrayPos: function(a) {
        return {
            row: Math.floor(a / this.currentLevelSize),
            col: a % this.currentLevelSize
        }
    },
    recalc2DArrayPos21DArrayPos: function(a, b) {
        return b * this.currentLevelSize + a
    },
    startHint: function() {
        if (!0 !== this.hintRunning &&
            !(0 >= this.hintCount)) {
            for (; 0 < this.movesHistoryList.length;) this.undoMove();
            this.hintCount--;
            saveAllGameData();
            this.hintRunning = !0;
            this.hintsList = levels.levelsDb[GAME_MODES.YUMMY][this.currentLevel].hints;
            this.hint_nextStart();
            guiManager.screenGame.lockUndoResetHintButtons()
        }
    },
    startHintNoQuestion: function() {
        for (; 0 < this.movesHistoryList.length;) this.undoMove();
        this.hintRunning = !0;
        this.hintsList = levels.levelsDb[GAME_MODES.YUMMY][this.currentLevel].hints;
        this.hint_nextStart();
        guiManager.screenGame.lockUndoResetHintButtons()
    },
    hint_nextStart: function() {
        this.hintCurrentMoveIdx++;
        if (!(this.hintCurrentMoveIdx >= this.hintsList.length)) {
            guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.forEachAlive(function(a) {
                a.inputEnabled = !1
            }, this);
            var a = this.hintsList[this.hintCurrentMoveIdx],
                b = null;
            guiManager.screenGame.screenGroup.gameBoardGroup.gmeGroup.forEachAlive(function(c) {
                c.elementPositionIdx === a.who && (c.inputEnabled = !0, b = c)
            }, this);
            this.hint_renewSelectorImg(b, a)
        }
    },
    hint_renewSelectorImg: function(a, b) {
        guiManager.screenGame.hintShow();
        var c = a.row,
            d = a.col;
        0 === b.where ? --c : 1 === b.where ? d += 1 : 2 === b.where ? c += 1 : 3 === b.where && --d;
        b.row_final = c;
        b.col_final = d;
        c = gameElements.recalc_getRealXYfrom2Dcoord(b.row_final, b.col_final);
        guiManager.screenGame.hintImg.reset(c.x + guiManager.screenGame.hintImg.offsetPos.x, c.y + guiManager.screenGame.hintImg.offsetPos.y + 7);
        d = gameElements.recalc_getRealXYfrom2Dcoord(a.row, a.col);
        guiManager.screenGame.hintHandImg.reset(d.x + guiManager.screenGame.hintImg.offsetPos.x, d.y + guiManager.screenGame.hintImg.offsetPos.y +
            GAME_TILE_HEIGHT / 2);
        removeObjectTweens(guiManager.screenGame.hintHandImg);
        game.add.tween(guiManager.screenGame.hintHandImg).to({
            x: c.x + guiManager.screenGame.hintImg.offsetPos.x,
            y: c.y + guiManager.screenGame.hintImg.offsetPos.y + GAME_TILE_HEIGHT / 2
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 500, -1).repeatDelay(700)
    },
    hint_update: function() {
        if (appState === APP_STATES.GAME_RUNNING || appState === APP_STATES.GAME_PATH_COMPLETED) this.hintCount > HINT_COUNT_MAX && (this.hintCount = HINT_COUNT_MAX), this.hintCount === HINT_COUNT_MAX ?
            guiManager.screenGame.setHintButtonText(this.hintCount) : (this.hint_timeTillNext -= game.time.physicsElapsed, 0 > this.hint_timeTillNext && (this.hint_timeTillNext = 0, this.hint_timeTillNext = HINT_TIME_TILL_NEXT_MAX, this.hintCount++, !1 === this.hintRunning && guiManager.screenGame.unLockHintButton(), saveAllGameData()), guiManager.screenGame.setHintButtonText(this.hintCount, this.hint_timeTillNext))
    },
    debugWriteGameField: function() {
        void 0 == this.debugGameFieldText && (this.debugGameFieldText = game.add.text(10, guiManager.screenGame.screenGroup.upperBarGrp.getChildAt(0).height +
            10, ""), this.debugGameFieldText.fill = "#ffffff", this.debugGameFieldText.fontSize = 15, this.debugGameFieldText.lineSpacing = -10);
        for (var a = "", b = 0; b < this.gameBoard.length; b++) {
            for (var c = 0; c < this.gameBoard[0].length; c++) a = this.gameBoard[b][c] === GAME_TILE_EMPTY ? a + "  " : a + "+";
            a += "\n"
        }
        this.debugGameFieldText.setText(a)
    },
    debugFPS: function() {
        this.fpsActual = Math.floor(1E3 / (Date.now() - this.lastUpdate));
        this.lastUpdate = Date.now();
        null == this.fpsText && (this.fpsText = game.add.text(game.width - 10, game.height / 2, "", {
                fill: "#ffffff"
            }),
            this.fpsText.anchor.x = 1, this.fpsText.fontSize = 20);
        this.fpsText.text = this.fpsActual
    }
};
var gameTexts = new GameTexts,
    Splash = function(a) {};
Splash.prototype = {
    preload: function() {
        this.game.load.crossOrigin = "Anonymous";
        game.canvas.id = "gameCanvas";
        var a = document.getElementById("gameCanvas");
        a.style.position = "fixed";
        a.style.zIndex = 1;
        this.game.stage.backgroundColor = GAME_BG_COLOR;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = !0;
        game.device.desktop || window.addEventListener("resize", function() {
            checkOrientation()
        });
        this.scale.refresh();
        loadSplash();
        gameTexts.preload();
        setCorrectResolution();
        game.device.desktop &&
            (game.input.mspointer.capture = !1)
    },
    create: function() {
        this._create()
    },
    _create: function() {
        var a = game.add.group();
        this.grp = a;
        var b = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "inllogo");
        b.scale.set(.75);
        setObjectAnchor(b, .5, .5);
        a.addChild(b);
        a.alpha = 0;
        game.add.tween(a).to({
            alpha: 1
        }, 1E3, Phaser.Easing.Cubic.InOut, !0, 0, 0, !1);
        a = 2 * Phaser.Timer.SECOND;
        checkOrientation();
        this.startPreloadDelayed(a)
    },
    startPreloadDelayed: function(a) {
        this.game.time.events.add(a, this.startPreload, this)
    },
    startPreload: function() {
        game.device.desktop ||
            !1 !== checkOrientation() ? (analyticsOnGameStartEvent(), setCorrectResolution(), this.game.state.start("PreloadState")) : this.startPreloadDelayed(Phaser.Timer.SECOND)
    }
};

function enterIncorrectOrientation() {
    showDiv("wrongRotation");
    game.onPause.dispatch()
}

function leaveIncorrectOrientation() {
    hideDiv("wrongRotation");
    game.onResume.dispatch()
}

function checkOrientation() {
    var a = !0;
    RUNNING_ON_IOS ? document.documentElement.clientWidth > document.documentElement.clientHeight ? (enterIncorrectOrientation(), a = !1) : leaveIncorrectOrientation() : window.innerWidth > window.innerHeight ? (enterIncorrectOrientation(), a = !1) : leaveIncorrectOrientation();
    return a
}

function setCorrectResolution() {
    resolutionX = Math.floor(window.innerWidth / window.innerHeight * resolutionY);
    resolutionX > resolutionX_max && (resolutionX = resolutionX_max);
    resolutionX < resolutionX_min && (resolutionX = resolutionX_min);
    game.scale.setGameSize(resolutionX, resolutionY);
    game.scale.refresh()
};
var Preloader = function(a) {};
Preloader.prototype = {
    preload: function() {
        game.stage.backgroundColor = GAME_BG_COLOR;
        loadAllGameData();
        loadLanguageSettings();
        gameTexts.create();
        this.createPreloadBG();
        this.bgLogo.alpha = 0;
        game.add.tween(this.bgLogo).to({
            alpha: 1
        }, 350, Phaser.Easing.Linear.None, !0, 0, 0, !1);
        this.preloadGroup.alpha = 0;
        game.add.tween(this.preloadGroup).to({
            alpha: 1
        }, 350, Phaser.Easing.Linear.None, !0, 0, 0, !1);
        this.game.load.setPreloadSprite(this.preloadGroup.loadingSlider);
        loadImages();
        SOUNDS_ENABLED && loadSounds();
        this.game.load.onFileComplete.add(this.fileComplete,
            this)
    },
    fileComplete: function(a, b, c, d, f) {
        this.preloadText.setText(a + " %")
    },
    create: function() {
        this._create()
    },
    _create: function() {
		this.startGame();
		/*
        this.showContinueText();
        game.input.onDown.addOnce(function() {
            this.hidePreloadScr();
            game.time.events.add(350, function() {
                this.startGame()
            }, this)
        }, this)
		*/
    },
    startGame: function() {
        game.state.start("GameState")
    },
    createPreloadBG: function() {
        this.bgLogo = game.add.sprite(game.width / 2, .45 * game.height, "gamelogo");
        setObjectAnchor(this.bgLogo, .5, .5);
        this.preloadGroup = game.add.group();
        var a = game.make.sprite(game.width / 2, 0, "loadingBG");
        a.scale.x = 1.3;
        setObjectAnchor(a, 0, .5);
        a.y = game.height - 50;
        a.x = (game.width - a.width) / 2;
        this.preloadGroup.add(a);
        var b = game.make.sprite(a.x, a.y, "loadingBG");
        b.tint = 10078449;
        b.scale.x = 1.3;
        setObjectAnchor(b, 0, .5);
        this.preloadGroup.loadingSlider = this.preloadGroup.add(b);
        var c = game.make.text(game.width / 2, a.y + 3, "0 %", {
            font: "25px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center",
            wordWrap: !0,
            wordWrapWidth: .85 * a.width
        });
        c.lineSpacing = -8;
        GAME_LANGUAGE === LANGUAGE_JA && (c.font ="Arial");
        setObjectAnchor(c, .5, .5);
        this.preloadGroup.add(c);
        c.makeBigTw = game.add.tween(c.scale).to({
            x: 1.05,
            y: 1.05
        }, 150, Phaser.Easing.Linear.None, !1, 700);
        c.makeSmallTw = game.add.tween(c.scale).to({
            x: 1,
            y: 1
        }, 150, Phaser.Easing.Linear.None, !1, 0);
        c.makeBigTw.onComplete.add(function() {
            c.makeSmallTw.start()
        }, this);
        c.makeSmallTw.onComplete.add(function() {
            c.makeBigTw.start()
        }, this);
        this.preloadText = c
    },
    showContinueText: function() {
        this.preloadText.setText(gameTexts.textFromID(TEXT_TAP_TO_CONTINUE));
        this.preloadText.makeBigTw.start()
    },
    hidePreloadScr: function() {
        game.add.tween(this.bgLogo).to({
            y: .27 * game.height
        }, 300, Phaser.Easing.Sinusoidal.Out, !0, 0);
        game.add.tween(this.preloadGroup).to({
            alpha: 0
        }, 150, Phaser.Easing.Linear.None, !0, 0)
    }
};
var appState, guiManager = new GUI,
    gamePlay = new GamePlay,
    musicPlayer = new GameSounds,
    GameState = function() {};
GameState.prototype = {
    preload: function() {
        guiManager.preload();
        gamePlay.preload();
        game.time.advancedTiming = !0;
        game.input.maxPointers = 1;
        game.cache.addBitmapFontFromAtlas("gamefont_bmp", "impk", "font", "gamefont_xml", "xml", 0, 0);
        game.cache.getBitmapFont("gamefont_bmp").font.lineHeight = 100
    },
    create: function() {
        guiManager.create();
        gamePlay.create();
        musicPlayer.create();
        analyticsOnGameLoadEvent();
        game.onPause.add(this.onGamePause, this);
        game.onResume.add(this.onGameResume, this);
        appState = APP_STATES.MENU;
        guiManager.screenSwitcher_openNewScreen(guiManager.screenMainMenu);
        musicPlayer.playMusic(MUSIC_MENU);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.fpsList = [];
        this.lastUpdate = Date.now()
    },
    onGamePause: function() {
        game.device.desktop && game.device.chrome && game.input.mspointer.stop();
        musicPlayer.pauseMusic();
        guiManager.screenGame.pauseGame()
    },
    onGameResume: function() {
        game.device.desktop && game.device.chrome && game.input.mspointer.stop();
        musicPlayer.resumeMusic()
    },
    update: function() {
        game.time.physicsElapsed = (Date.now() - this.lastUpdate) / 1E3;
        guiManager.update();
        gamePlay.update();
        if (50 > this.fpsList.length) {
            var a = Math.floor(1E3 / (Date.now() - this.lastUpdate));
            a > GAME_MAX_FPS && (a = GAME_MAX_FPS);
            0 !== a && (this.fpsList.push(a), GAME_AVERAGE_FPS = average(this.fpsList))
        }
        this.lastUpdate = Date.now()
    }
};

function updateGameLanguage(a) {
    GAME_LANGUAGE = a;
    gameTexts.loadTexts();
    guiManager.resetScreenTexts()
}

function loadAllGameData() {
    try {
        var a = localStorage.getItem("bq-data");
        if (null !== a && (parsedData = JSON.parse(a), null !== parsedData)) {
            var b = parsedData.lvlz;
            null !== b && (gamePlay.levelsProgress = b);
            b = parsedData.hnt;
            gamePlay.hintCount = 0 <= b && 11 >= b ? b : 0;
            b = parsedData.hnttm;
            gamePlay.hint_timeTillNext = 0 <= b && b <= HINT_TIME_TILL_NEXT_MAX ? b : HINT_TIME_TILL_NEXT_MAX;
            SOUNDS_ENABLED && (b = parsedData.msc, !0 === b || !1 === b) && (musicPlayer.musicON = b)
        }
    } catch (c) {}
}

function saveAllGameData() {
    var a = {};
    a.lvlz = gamePlay.levelsProgress;
    a.hnt = gamePlay.hintCount;
    a.hnttm = Math.floor(gamePlay.hint_timeTillNext);
    a.msc = musicPlayer.musicON;
    try {
        localStorage.setItem("bq-data", JSON.stringify(a))
    } catch (b) {}
};
var resolutionX_min = 420,
    resolutionX_max = 650,
    resolutionX = resolutionX_max,
    resolutionY = 800;

function ie_ver() {
    var a = 0,
        b = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
        c = !!navigator.userAgent.match(/Trident\/7.0/),
        d = navigator.userAgent.indexOf("rv:11.0");
    b && (a = new Number(RegExp.$1)); - 1 != navigator.appVersion.indexOf("MSIE 10") && (a = 10);
    c && -1 != d && (a = 11);
    return a
}
var game, phaserInit = function() {
    Phaser.Device._initialize();
    RUNNING_ON_DESKTOP = Phaser.Device.desktop;
    var a = Phaser.WEBGL;
    RUNNING_ON_DESKTOP && (a = Phaser.AUTO);
    11 == ie_ver() && (a = Phaser.CANVAS);
    game = new Phaser.Game(resolutionX, resolutionY, a, "", null, !0);
    game.forceSingleUpdate = !0;
    game.state.add("SplashState", Splash);
    game.state.add("PreloadState", Preloader);
    game.state.add("GameState", GameState);
    game.state.start("SplashState");

    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
    document.body.style.backgroundImage = "url('img/back-grass.png')"
};

window.phsrI = phaserInit;
window.addEventListener("contextmenu", function(a) {
    a.preventDefault()
});
window.addEventListener("touchend", function() {
    if (null !== game) try {
        "running" !== game.sound.context.state && game.sound.context.resume()
    } catch (a) {}
}, !1);
RUNNING_ON_IOS || (document.addEventListener("touchstart", function(a) {
    a.preventDefault()
}), document.addEventListener("touchmove", function(a) {
    a.preventDefault()
}));