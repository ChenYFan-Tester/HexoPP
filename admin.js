	function base64Encode(input){
                var rv;
                rv = encodeURIComponent(input);
                rv = unescape(rv);
                rv = window.btoa(rv);
                return rv;
        }
	function ajaxObject() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
        } 
    catch (e) {
        // Internet Explorer
        try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
    return xmlHttp;
}
 
// ajax post请求：
function ajaxPost ( url , data , fnSucceed , fnFail , fnLoading ) {
    var ajax = ajaxObject();
    ajax.open( "post" , url , true );
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                fnSucceed( ajax.responseText );
            }
            else {
                fnFail( "HTTP请求错误！错误码："+ajax.status );
            }
        }
        else {
            fnLoading();
        }
    }
    ajax.send( data );
 
}
	const loadMarkdown = (url) => {
                mdeditor.value = '加载中。。。';
                fetch(url, { method: 'GET' }).then((resp) => {
                    return Promise.all([resp.ok, resp.status, resp.text(), resp.headers]);
                }).then(([ok, status, data, headers]) => {
                    if (ok) {
                        return {
                            ok,
                            status,
                            data,
                            headers
                        }
                    } else {
                        throw new Error(JSON.stringify(json.error));
                    }
                }).then((resp) => {
                    mdeditor.value = resp.data;
                }).catch((error) => {
                    mdeditor.value = '';
                });
            
        };
	var ctJson = "/hpp/admin/api/getlist"
        $.getJSON(ctJson, function (data) {
            $.each(data, function (index, value) {
                $("#choo").append(`
				  <option>${value.name}<\/option>
                `);
            });
			console.log('get!')
			 $('#choo').editableSelect();
        });
	$(function(){
		$("#mdeditor").markdown({language:'zh'})
	});

	function getdoc(){
	url="/hpp/admin/api/getdoc/"+choo.value+"?_"+Date.now(new Date())
	loadMarkdown(url);
	};
	function hpp_uploadmarkdown(){
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/adddoc/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                alert('200')
            }
            else {
                alert('ERROR');
            }
        }
    }
    ajax.send(base64Encode(mdeditor.value));
	}
