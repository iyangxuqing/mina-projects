// pages/city/city.js
import { CityPicker } from "../../template/citypicker/citypicker.js"

Page({
  data: {
  },

  onDistrictTap: function (e) {
    this.cityPicker.show({
      success: function (res) {
        console.log(res)
      }
    })
  },

  onLoad: function (options) {
    this.cityPicker = new CityPicker()
  }

})