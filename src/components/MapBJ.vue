<template>
  <div id="map" ref="BJMapchart" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
import L7 from "@antv/l7";
import { isDuration } from "moment";

require("echarts/map/js/china.js");
require("echarts/map/js/province/beijing");

export default {
  name: "mapBJ",
  props: {
    itemsBJMap: {
      type: Array
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String
    }
  },
  data() {
    return {
      lineData: {},
      center: [116.397451, 40.2],
      pointDivisor: 8,
      regionLongitude: "",
      regionLatitude: "",
      scene: {},
      popup:{},
    };
  },
  watch: {
    itemsBJMap: {
      handler(newValue, oldValue) {
        if(newValue){
          this.layer(newValue)
        }
      },
      deep: true
    }
  },
  components: {},
  mounted() {
    this.$axios.get("./static/110000_full.json").then(res => {
      this.lineData = res.data;
      this.mapNew();
    });
  },
  methods: {
    mapNew() {
      let _this = this;
      this.popup = new L7.Popup();
      this.scene = new L7.Scene({
        id: "map",
        mapStyle: "dark",
        center: [116.397451, 40.2],
        pitch: 0,
        zoom: 8.5
      })
      this.scene.on("loaded", function() {
        //区域边界线图层
        _this.scene
          .LineLayer({
            zIndex: 3
          })
          .source(_this.lineData)
          .color("rgba(0,231,255,0.5)")
          .size([1.5, 0])
          .shape("line")
          .active(false)
          .style({
            lineType: "solid"
          })
          .render();
        //区域填充图层
        var polygon = _this.scene
          .PolygonLayer({ zIndex: 3 })
          .source(_this.lineData)
          .color("#152334")
          .shape("fill")
          .active(false)
          .style({
            opacity: 0.2
          })
          .render();
        polygon.on("mousemove", function(e) {
          // console.log(e)
        });
        //点图层
        var layer = _this.layer(_this.itemsBJMap);
        _this.scene.on("zoomchange", ev => {
          _this.scene.center = [_this.scene.getCenter().Q, _this.scene.getCenter().P];
        });
        layer.on("mousemove", function(e) {
          // _this.popup(e, scene);
          // console.log(e);
          var lnglat = e.lnglat,
            feature = e.feature;
          if (feature.sumH) {
            feature.num = feature.influence;
            // _this.forRounding(feature.sumH, 0);
          }
          if (feature.regionLatitude) {
            feature.name = feature.name;
          }
          if (!feature.regionLatitude) {
            feature.name = feature.region;
          }
          if (feature.citys) {
            feature.num = feature.citys.length;
          }
          if (feature.value) {
            feature.name = "北京";
            feature.num = feature.value;
          }
          var html =
            "<div class='mousemove-txt'>" +
            feature.name +
            ":" +
            feature.num +
            "</div>";
          _this.popup
            .setLnglat([lnglat.lng, lnglat.lat])
            .setHTML(html)
            .addTo(_this.scene);
          _this.closeX();
        });
      });
    },
    //layer封装--》显示散点
    layer(dataObj) {
      var layer = this.scene
        .PointLayer({
          zIndex: 2
        })
        .source(dataObj, {
          parser: {
            type: "json",
            x: "longitude",
            y: "latitude"
          }
        })
        .shape("circle")
        .size(15)
        .active(false)
        .color("rgba(0,231,255,0.5)")
        .style({
          stroke: "#27F5FF",
          strokeWidth: 2,
          opacity: 1.0
        })
        .render();
      return layer;
    },
    //去掉tip提示框上的X
    closeX() {
      var l7PopupCloseButton = document.getElementsByClassName(
        "l7-popup-close-button"
      );
      l7PopupCloseButton[0].parentNode.removeChild(l7PopupCloseButton[0]);
    }
  }
};
</script>
<style>
.mousemove-tip {
  width: 1px;
  height: 20px;
}
</style>
