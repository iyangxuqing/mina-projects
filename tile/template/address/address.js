import { CityPicker } from "../../template/citypicker/citypicker.js"

let page = null

let data = {
}

let methods = {
    onDistrictTap: function (e) {
        this.cityPicker.show()
    },
}

export class Address {
    constructor(options) {
        page = getCurrentPages().pop()
        this.init(options)
        options.parentScope = 'address'
        this.cityPicker = new CityPicker(options)
    }

    init(options) {
        page.setData({
            'address': data.address
        })
        for (let key in methods) {
            page['address.' + key] = methods[key].bind(this)
            page.setData({
                ['address.' + key]: 'address.' + key
            })
        }
    }
}