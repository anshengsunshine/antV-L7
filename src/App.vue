<template>
  <div id="app">
     <MapBJ :itemsBJMap="MapBJData" style="height:100vh;position: absolute;z-index: 1" />
  </div>
</template>

<script>
import MapBJ from "@/components/MapBJ";
export default {
  name: "app",
  components: {
    MapBJ
  },
  data(){
    return {
       MapBJData: [
        {
          eventId: "1",
          name: "散点一散点一散点一散点一散点一散点一",
          latitude: 39.88151,
          longitude: 116.537318,
          sumH: Math.round(Math.random() * 1000),
          influence: Math.round(Math.random() * 100),
          region: "朝阳区",
          regionLatitude: 39.926375,
          regionLongitude: 116.449559,
          isDanger: false
        },
        {
          eventId: "2",
          name: "散点二散点二散点二散点二散点二散点二",
          latitude: 39.911682,
          longitude: 116.417334,
          sumH: Math.round(Math.random() * 1000),
          influence: Math.round(Math.random() * 100),
          region: "东城区",
          regionLatitude: 39.934827,
          regionLongitude: 116.422401,
          isDanger: false
        },
        {
          eventId: "3",
          name: "散点三",
          latitude: 39.895611,
          longitude: 116.361276,
          sumH: Math.round(Math.random() * 1000),
          influence: Math.round(Math.random() * 100),
          region: "西城区",
          regionLatitude: 39.918124,
          regionLongitude: 116.372514,
          isDanger: false
        }
      ], //北京地图数据
    }
  },
  created() {
    setInterval(() => {
      this.MapBJData = [
        {
          eventId: "4",
          name: "变化后的散点一",
          latitude: 39.895611,
          longitude: 115.361276,
          sumH: Math.round(Math.random() * 1000),
          influence: Math.round(Math.random() * 100),
          region: "西城区",
          regionLatitude: 39.918124,
          regionLongitude: 116.372514
        },

        {
          eventId: "5",
          name: "  变化后的散点二",
          latitude: 39.713559,
          longitude: 116.428769,
          sumH: Math.round(Math.random() * 1000),
          influence: Math.round(Math.random() * 100),
          region: "东城区",
          regionLatitude: 39.934827,
          regionLongitude: 116.422401
        }
      ];
    }, 10000);
  },
};
</script>
<style scoped>
#app {
  background-color: #333;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
</style>
