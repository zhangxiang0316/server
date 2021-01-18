/**
 * create by zhangxiang on 2021-01-12 14:10
 * 类注释：
 * 备注：
 */
new Vue({
    el: '#app',
    data: {
        inputText: "",
        showInput: false,
        showList: [],
        list: configList,
    },
    created() {
        this.showList = JSON.parse(JSON.stringify(this.list))
    },
    watch: {
        inputText(val) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getShowList(val)
            }, 300)
        }
    },

    methods: {
        getShowList(val) {
            let list = this.list.filter(item => {
                return item.name.indexOf(val) !== -1
            })
            this.showList = JSON.parse(JSON.stringify(list));
        }
    },
    directives: {
        showTips: {
            bind: function (el, binding) {
                let message = el.innerText
                if (message.length > binding.value.length) {
                    message = `${message.substring(0, binding.value.length)}...`
                }
                el.innerText = message
            },

            inserted: function (el, binding) {
                if (el.innerText.length > binding.value.length) {
                    let oTip = document.createElement('div');
                    oTip.innerHTML = `<div>${binding.value.tipName}</div>`;
                    oTip.className = 'v-tooltip__content';
                    el.style.position = 'relative';
                    oTip.setAttribute('id', 'vc-tooltip')
                    el.appendChild(oTip);
                    oTip.style.cssText = 'left: 50%; top: -10px;  transform: translate(-50%,-100%);';
                    el.onmousemove = function () {
                        oTip.style.opacity = 1;
                    }
                    el.onmouseout = function () {
                        oTip.style.opacity = 0;
                    }
                }
            },
            unbind() {
                const oTip = document.getElementById('vc-tooltip')
                oTip && document.body.removeChild(oTip)
            }
        },
        focus: {
            componentUpdated: function (el) {
                el.focus()
            }
        }
    },
})
