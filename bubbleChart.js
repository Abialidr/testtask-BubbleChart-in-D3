console.log(d3);

var language = [
  { key: "Arabic", value: 8 ,color : "#c5bbaa"},
  { key: "Azerbaijani", value: 1 ,color : "#7989a4" },
  { key: "Bengali", value: 7 ,color : "#c2957f" },
  { key: "Bulgarian", value: 1 ,color : "#7989a4" },
  { key: "Cantonese", value: 12 ,color : "#61718e" },
  { key: "Catalan", value: 2 ,color : "#d3d0be" },
  { key: "Croatian", value: 1 ,color : "#ca6b4f" },
  { key: "Chinese", value: 38 ,color : "#996b54" },
  { key: "Danish", value: 1 ,color : "#aab5c2" },
  { key: "Dutch", value: 2 ,color : "#d6be94" },
  { key: "English", value: 361 ,color : "#b7a99a" },
  { key: "French", value: 15 ,color : "#b1c0c9" },
  { key: "German", value: 14 ,color : "#c2957f" },
  { key: "Greek", value: 8 ,color : "#9c8970" },
  { key: "Gujarati", value: 10 ,color : "#7d7e81" },
  { key: "Hebrew", value: 1 ,color : "#9c8970" },
  { key: "Hindi", value: 71 ,color : "#9c3b1e" },
  { key: "Irish", value: 1 ,color : "#818285" },
  { key: "Arabic", value: 8 ,color : "#834c3b" },
  { key: "Japanese", value: 1 ,color : "#c2957f" },
  { key: "Kannada", value: 2 ,color : "#e4856f" },
  { key: "Kazakh", value: 2 ,color : "#c2957f" },
  { key: "Korean", value: 2 ,color : "#7d7e81" },
  { key: "Latin", value: 1 ,color : "#b1c0c9" },
  { key: "Latvian", value: 1 ,color : "#e3d7a4" },
  { key: "Lithuanian", value: 1 ,color : "#61718e" },
  { key: "Malay", value: 2 ,color : "#a77a6c"},
  { key: "Malayalam", value: 6 ,color : "#c5bbaa" },
  { key: "Maltese", value: 1 ,color : "#e3d7a4" },
  { key: "Mandarin", value: 15 ,color : "#c2957f" },
  { key: "Marathi", value: 33 ,color : "#a7a9ac" },
  { key: "Nepali", value: 2 ,color : "#a77a6c" },
  { key: "Persian", value: 7 ,color : "#61718e" },
  { key: "Polish", value: 9 ,color : "#e4856f" },
  { key: "Portuguese", value: 6 ,color : "#ac8d7c" },
  { key: "Punjabi", value: 1 ,color : "#949597" },
  { key: "Romanian", value: 4 ,color : "#909194" },
  { key: "Russian", value: 9 ,color : "#6b839e" },
  { key: "Sindhi", value: 1 ,color : "#55839e"},
  { key: "Somali", value: 1 ,color : "#929a82" },
  { key: "Spanish", value: 81 ,color : "#929a82" },
  { key: "Swedish", value: 1 ,color : "#a0bec7" },
  { key: "Tagalog", value: 3 ,color : "#acbec0" },
  { key: "Taiwanese", value: 2 ,color : "#998d7c" },
  { key: "Tamil", value: 7 ,color : "#7a9194" },
  { key: "Telugu", value: 6 ,color : "#e39780" },
  { key: "Thai", value: 2 ,color : "#9bb5c0" },
  { key: "Turkish", value: 6 ,color : "#d8bcbb" },
  { key: "Turkmen", value: 1 ,color : "#e39780" },
  { key: "Ukrainian", value: 5 ,color : "#759aaa" },
  { key: "Urdu", value: 4 ,color : "#d8bcbb" },
  { key: "Vietkeyse", value: 10 ,color : "#e99780" },
  { key: "Yoruba", value: 1 ,color : "#909194" },
];

var size = d3.scaleLinear().domain([0, 360]).range([20, 100]);
language.forEach((data) => {
  data.size = size(data.value);
});

var width = window.innerWidth,
  height = window.innerHeight;

var size = d3.scaleLinear().domain([0, 360]).range([20, 100]);

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var mouseover = function (d) {

  language[d.index].size = 45;

  forceCollide = simulation.force("collision");

  d3.select(this).call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

  if (d.value < 100) {
    d3
      .select(this)
      .select("circle")
      .transition()
      .delay(75)
      .duration(200)
      .ease(d3.easeLinear)
      .attr("r", function (d) {
        if (d.value < 100) {
          return 45;
        } else return size(d.size);
      })
      
    d3.select(this)
      .selectAll("text")
      .transition()
      .delay(75)
      .duration(195)
      .ease(d3.easeLinear)
      .style("font-size", "85%");

      
      forceCollide
        .radius(function (d) {
          return d.size + 1;
        })
        .strength(0.1)
        .iterations(10)
  }
};

var mouseleave = function (d) {
  language[d.index].size = size(d.value);
  forceCollide = simulation.force("collision");
  forceCollide
    .radius(function (d) {
      return d.size + 1;
    })
    .strength(0.1);
  simulation.alphaTarget(10).restart();

  if (d.value < 100) {
    d3.select(this)
      .select("circle")
      .transition()
      .duration(400)
      .ease(d3.easeLinear)
      .attr("r", function (d) {
        return size(d.value);
      });

    d3.select(this)
      .selectAll("text")
      .transition()
      .duration(400)
      .ease(d3.easeLinear)
      .style("font-size", "35%");

  }
};

var elem = svg.selectAll("g myCircleText").data(language);

var elemEnter = elem
  .enter()
  .append("g")
  .on("mouseover", mouseover)
  .on("mouseleave", mouseleave);

elemEnter
  .append("circle")
  .style("fill", function (d) {
    return d.color;
  })
  .attr("class", "node")
  .style("fill-opacity", 1)
  .style("cursor", "pointer")
  .attr("r", function (d) {
    return size(d.value);
  });

elemEnter
  .append("text")
  .text(function (d) {
    console.log(d);
    const string =d.key
    return string;
  })
  .attr("font-size", function (d) {
    if (d.value < 100) {
      return "35%";
    } else return "100%";
  })
  .attr("dy", "0em")
  .style("cursor", "pointer")
  .style("font-weight", "bold")
  .style("font-family", "sans-serif")
  .style("text-anchor", "middle")

elemEnter
  .append("text")
  .text(function (d) {
    console.log(d);
    const string =d.value
    return string;
  })
  .attr("dy", "1em")
  .attr("font-size", function (d) {
    if (d.value < 100) {
      return "35%";
    } else return "100%";
  })
  .style("cursor", "pointer")
  .style("font-weight", "bold")
  .style("text-anchor", "middle")
  .style("font-family", "sans-serif")

var simulation = d3
  .forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("charge", d3.forceManyBody().strength(0.1))
  .force(
    "collision",
    d3
      .forceCollide()
      .strength(0.1)
      .radius(function (d) {
        return d.size + 1;
      })
      .iterations(1)
  );

simulation.nodes(language).on("tick", function (d) {
  elemEnter.attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(20).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(20);
  d.fx = null;
  d.fy = null;
}
