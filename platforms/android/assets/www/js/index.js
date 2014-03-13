var gFlagChked = 0;
var gPageList = new Array('', 'index.html', 'lvds.html', 'vby1.html', 'dp.html');

$(document).ready(function() {
    $( "input[name=radio-choice-1]" ).change(function () {
        var radioValue = $(this).val();
        if( gFlagChked != radioValue )
            app.funcSetRadio();
    });    
});


var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", onExitSelect, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        app.funcFirstRun();
    },

    funcFirstRun: function() {
        var flagFirst = localStorage.getItem("BANDCALC_FIRST_RUN");
        var flagItem = localStorage.getItem("BANDCALC_MYSET");

        if( flagFirst != null )
        {
            if(  flagFirst == "yes" )
            {
                if( flagItem != null )
                {
                    onSaveToLocalStorage("BANDCALC_FIRST_RUN", "no");
                    location.replace(gPageList[flagItem]);
                }
                else
                {
                    onSaveToLocalStorage("BANDCALC_FIRST_RUN", "no");
                    onSaveToLocalStorage("BANDCALC_MYSET", "1");
                    location.replace("index.html");  
                }
            }
        }
        else
        {
            onSaveToLocalStorage("BANDCALC_FIRST_RUN", "no");
            onSaveToLocalStorage("BANDCALC_MYSET", "1");
            //location.replace("index.html");  
        }
    },

    funcRefreshRadio: function() {
        if(localStorage.getItem("BANDCALC_MYSET") != null)
        {
            gFlagChked = localStorage.getItem("BANDCALC_MYSET");

            if( (gFlagChked<1) || (gFlagChked>4) )
                gFlagChked = 1;

            $( "input:radio[name=radio-choice-1]" ).filter( "input[value="+gFlagChked+"]").attr("checked", "checked").trigger("change");
        }
    },

    funcSetRadio: function() {
        gFlagChked = $( "input:radio[name=radio-choice-1]:checked" ).val();
        onSaveToLocalStorage("BANDCALC_MYSET", gFlagChked);  
    }
};

 
function onSaveToLocalStorage(key, value)
{
    if (typeof(localStorage) == 'undefined' ) 
    {
        alert('HTML5 Local Storage를 지원하지 않네요...');
    } else 
    {
        try 
        {
            localStorage.setItem(key, value);
        } catch (e) 
        {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('할당량 초과!'); 
                onExitSelect();
            }
        }
    }
}

function onExitSelect()
{
    navigator.notification.confirm('종료하시겠습니까?', onExitSelectMsg, '종료', '취소, 종료');
}

function onExitSelectMsg(button)
{
    if(button == 2)
    {
        navigator.app.exitApp();
        onSaveToLocalStorage("BANDCALC_FIRST_RUN", "yes");        
    }
}

