<template>
    <div>
        <table class="priceTable" cellspacing="0" style="font-size: 18px">
            <thead class="priceTable_head tableMsg"></thead>
            <tbody class="priceTable_body tableMsg">
            <tr>
                <th colspan="2">服务项目</th>
                <th>价格</th>
            </tr>

            <template v-for="(items, key) in tableMap">
                <template v-for="(price, time) in items">
                    <tr>
                        <td
                                v-if="Object.keys(items)[0] == time"
                                :rowspan="Object.keys(items).length"
                        >
                            {{ key }}
                        </td>
                        <td>{{ time }}</td>
                        <td>{{ price }}</td>
                    </tr>
                </template>
            </template>
            </tbody>
        </table>
        <div style="padding-bottom: 30%;"></div>
    </div>
</template>
<script>
import request from "../utils/request";

export default {
    name: "PriceTable",
    data() {
        return {
            tableMap: {},
        };
    },
    created() {
        this.reqTableDta();
    },
    mounted() {
        // this.tableMapToBox();
    },
    methods: {
        reqTableDta() {
            request.get("/sysPriceTable/getTableInfo").then((res) => {
                this.tableMap = this.sortCategoryItemByPrice(res.data.data);
                // console.log(this.tableMap);
            });
        },

        sortCategoryItemByPrice(data) {
            for (let categoryName in data) {
                data[categoryName] = this.sortObjectByValue(data[categoryName]);
            }
            return data;
        },

        sortObjectByValue(obj) {
            // 顺序排序value值
            const sortedValue = Object.values(obj).sort((a, b) => {
                return a - b;
            });

            // 创建结果数组
            const res = {};
            // keys数组
            const keys = Object.keys(obj);
            // 给value值赋值相应keys值
            for (let i in sortedValue) {
                keys.forEach((item) => {
                    if (sortedValue[i] === obj[item]) {
                        res[item] = sortedValue[i];
                    }
                });
            }

            return res;
        },
    },
};
</script>
<style lang="less">
.priceTable {
  width: 96%;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
  line-height: normal;
  //margin-left: 10px ;
  ////margin-right: 10px ;
  margin: auto;

  .priceTable_body {
    border: none;

    th,
    td {
      border-right: 1px solid #f6f6f6;
      font-size: 24px;
      vertical-align: middle;
    }

    tr {
      font-size: 24px;
      border-bottom: 1px solid #f6f6f6;
      text-align: center;
      justify-content: center;
    }
  }
}
</style>
