const width = 1800;
const height = 800;
const collision_radius = 20;
const tooltip = d3.select("#tooltip"); // Select the tooltip div
const label_font_size = "16px"

// Define positions for category groups

const categoryPositions = {
    type_cat: { 
        environment: width * 0.2, 
        social: width * 0.4, 
        government: width * 0.6, 
        economics: width * 0.8 
    },
    cost_cat: {
        "kl_500k": width * 0.2,
        "500k-1M": width * 0.4,
        "1M-5M": width * 0.6,
        "gr_5M": width * 0.8
    },
    duration_cat: {
        "kl_6Mt": width * 0.2,
        "6Mt-1.5J": width * 0.4,
        ".5J-3J": width * 0.6,
        "gr3J": width * 0.8
    },
    year_cat: {
        "kl_2019": width * 0.2,
        "2019-2021": width * 0.4,
        "2022-2024": width * 0.6,
        "gr_2022-2024": width * 0.8
    }
};

// Load data from JSON
d3.json("projects.json").then(data => {

    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    // Create a simulation
    const simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collision", d3.forceCollide(d => Math.sqrt(d.cost) / collision_radius + 2))
        .force("clamp", clampForce(width, height)) // Add bounding force
        .on("tick", ticked);

    // Create groups for nodes
    const nodes = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));

    // Add circles
    nodes.append("circle")
        .attr("r", d => Math.sqrt(d.cost) / collision_radius)
        .attr("fill", d => {
            const colors = { environment: "#1f77b4", social: "#ff7f0e", government: "#2ca02c", economics: "#d62728" };
            return colors[d.type_cat];
        });

    // Add text labels
    nodes.append("text")
        .text(d => d.name)
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .style("font-size", label_font_size);
    
    nodes.on("mouseover", function (event, d) {
        tooltip
            .style("opacity", 1)
            .html(`
                <strong>Project:</strong> ${d.name}<br>
                <strong>Start Year:</strong> ${d.start_year}<br>
                <strong>Cost:</strong> $${d.cost.toLocaleString()}<br>
                <strong>Duration:</strong> ${d.time} months<br>
                <strong>Category:</strong> ${d.category}
            `);
    })
    .on("mousemove", function (event) {
        tooltip
            .style("left", `${event.pageX + 15}px`)
            .style("top", `${event.pageY + 15}px`);
    })
    .on("mouseleave", function () {
        tooltip.style("opacity", 0);
    });


    function addClusterLabels(groupBy) {
        svg.selectAll(".cluster-label").remove(); // Remove old labels

        const positions = categoryPositions[groupBy];
        if (!positions) return;

        svg.selectAll(".cluster-label")
            .data(Object.keys(positions))
            .enter()
            .append("text")
            .attr("class", "cluster-label")
            .attr("x", d => positions[d]) // Use positions from categoryPositions
            .attr("y", 50) // Fixed y position for cluster labels
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .style("fill", "#333")
            .text(d => d); // Use group names as labels
    }
    
    // Function to update clustering
    window.updateClustering = function () {
        const groupBy = document.getElementById("group-by").value; // Get selected value
        simulation.force("x", d3.forceX(d => {
            const positions = categoryPositions[groupBy];
            console.log(positions);
            return positions[d[groupBy]] || width / 2; // Use positions mapping
        }).strength(0.1));
        simulation.alpha(1).restart(); // Restart simulation
        addClusterLabels(groupBy);
    };

    // Tick handler
    function ticked() {
        nodes.attr("transform", d => `translate(${d.x}, ${d.y})`);
    }

    // Drag event handlers
    function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // Bounding force to keep nodes within SVG
    function clampForce(width, height) {
        return alpha => {
            data.forEach(d => {
                d.x = Math.max(Math.sqrt(d.cost) / collision_radius, Math.min(width - Math.sqrt(d.cost) / collision_radius, d.x));
                d.y = Math.max(Math.sqrt(d.cost) / collision_radius, Math.min(height - Math.sqrt(d.cost) / collision_radius, d.y));
            });
        };
    }
});

addClusterLabels("type_cat");