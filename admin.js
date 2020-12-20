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
                sweetAlert("糟糕", "你的浏览器不能上传文件", "error");
                return false;
            }
        }
    }
    return xmlHttp;
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
choo.value = "选择一个文件或直接新增一个文件"
choo.disabled="true"
	var ctJson = "/hpp/admin/api/getlist"
        $.getJSON(ctJson, function (data) {
            $.each(data, function (index, value) {
                $("#choo").append(`
				  <option>${value.name}<\/option>
                `);
            });
			console.log('get!')
			 $('#choo').editableSelect();
		choo.disabled="false"
        });
	$(function(){
		$("#mdeditor").markdown({language:'zh'})
	});

	function getdoc(){
		choo.disabled="true"
		mdeditor.disabled="true"
	url="/hpp/admin/api/getdoc/"+choo.value+"?_"+Date.now(new Date())
	loadMarkdown(url);
		choo.disabled="false"
		mdeditor.disabled="false"
	};
	function hpp_uploadmarkdown(){
		choo.disabled="true"
		mdeditor.disabled="true"
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/adddoc/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                sweetAlert("成功",  "文件已上传", "success");
		    choo.disabled="false"
		mdeditor.disabled="false"
            }
            else {
                sweetAlert("糟糕", "上传文件失败!", "error");
		    choo.disabled="false"
		mdeditor.disabled="false"
            }
        }
    }
    ajax.send(base64Encode(mdeditor.value));
	}
