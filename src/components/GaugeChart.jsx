import React from "react";
import ReactECharts from "echarts-for-react";

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

        data: [{ value: value, name: `Tahmini Vize Alma İhtimaliniz` }],
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
          ? "Durumunuz oldukça riskli görünüyor. Vize başvurusu yapmadan önce kıdemli vize danışmanlarımızla değerlendirme yapmanızı öneririz"
          : value >= 51 && value <= 80
          ? "Riskli profildesiniz. Süreci AYA Journey ile sürdürüp vize alma ihtimalinizi arttırabilirsiniz."
          : value >= 81 && value <= 100
          ? "Durumunuz gayet iyi görünüyor! Yine de riskleri en aza indirmek ve hatasız bir başvuru için AYA Journey size destek vermek için hazır"
          : ""}
      </div>
    </>
  );
};

export default GaugeChart;
