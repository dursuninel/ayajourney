import React from "react";
import ReactECharts from "echarts-for-react";
import { t } from "i18next";

const GaugeChart = ({ value }) => {
  const options = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 2,
        axisLine: {
          lineStyle: {
            width: 25,
            color: [
              [0.5, "#FF0000"], // Red
              [0.8, "#FFD700"], // Yellow
              [1, "#00FF00"], // Green
            ],
          },
        },
        pointer: {
          show: true,

          width: 3,
          length: "90%",
        },
        title: {
          show: true,
          offsetCenter: [0, "50%"],
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          fontSize: 25,
          formatter: "{value}%",
          offsetCenter: [0, "27%"],
        },
        axisLabel: {
          show: true, // Eksen üzerindeki değerleri gizler

          distance: 30, // Eksen etiketlerinin uzaklığını ayarlar
          fontSize: 10, // Eksen etiketlerinin yazı boyutunu ayarlar
          color: "black", // Eksen etiketlerinin renkini ayarlar
          fontWeight: "bold", // Eksen etiketlerinin kalınlığını ayarlar
          formatter: function (value) {
            return value + "%";
          },
        },
        splitLine: {
          show: true, // Çizgi bölmeleri gizler (isteğe bağlı)
        },
        axisTick: {
          show: true, // Küçük tik işaretlerini gizler (isteğe bağlı)
        },

        data: [{ value: value, name: t("calcText.message1") }],
      },
    ],
  };

  return (
    <>
      <div style={{ width: "100%", height: "230px" }}>
        <ReactECharts option={options} />
      </div>
      <div className="score_text">
        {value >= 0 && value <= 50
          ? t("calcText.message2")
          : value >= 51 && value <= 80
          ? t("calcText.message3")
          : value >= 81 && value <= 100
          ? t("calcText.message4")
          : ""}
      </div>
    </>
  );
};

export default GaugeChart;
