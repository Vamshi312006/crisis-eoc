const form = document.getElementById("incidentForm");
const table = document.getElementById("incidentTable");

// ==============================
// MAP
// ==============================

const map = L.map("map").setView([20.5937, 78.9629], 5);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "© OpenStreetMap"
    }
).addTo(map);

// Demo markers
L.marker([13.0827, 80.2707]).addTo(map).bindPopup("Flood Warning");
L.marker([17.3850, 78.4867]).addTo(map).bindPopup("Power Outage");

// ==============================
// CHART
// ==============================

const chart = new Chart(
    document.getElementById("priorityChart"),
    {
        type: "doughnut",
        data: {
            labels: ["High", "Medium", "Low"],
            datasets: [{
                data: [1,1,0]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    }
);

// ==============================
// SUBMIT INCIDENT
// ==============================

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const title=document.getElementById("title").value;
    const location=document.getElementById("location").value;
    const priority=document.getElementById("priority").value;

    const response=await fetch("/add_incident",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            title,
            location,
            priority
        })

    });

    const data=await response.json();

    const incident=data.incident;

    let badge="priority-low";

    if(priority==="High")
        badge="priority-high";

    else if(priority==="Medium")
        badge="priority-medium";

    const row=`

<tr>

<td>${incident.id}</td>

<td>${incident.title}</td>

<td>${incident.location}</td>

<td>

<span class="${badge}">
${incident.priority}
</span>

</td>

<td id="status-${incident.id}">
${incident.status}
</td>

<td>${incident.time}</td>

<td>

<button onclick="advance(${incident.id})">
Advance
</button>

</td>

<td>

<button onclick='recommend(${JSON.stringify(incident.recommendation)})'>
AI
</button>

</td>

</tr>

`;

    table.insertAdjacentHTML("afterbegin",row);

    // Random marker

    const lat=8+Math.random()*20;
    const lon=70+Math.random()*20;

    L.marker([lat,lon])
    .addTo(map)
    .bindPopup(title);

    // Update chart

    if(priority==="High")
        chart.data.datasets[0].data[0]++;

    else if(priority==="Medium")
        chart.data.datasets[0].data[1]++;

    else
        chart.data.datasets[0].data[2]++;

    chart.update();

    updateDashboard();

    form.reset();

});

// ==============================
// INCIDENT WORKFLOW
// ==============================

async function advance(id){

    const response=await fetch("/update_status/"+id,{
        method:"POST"
    });

    const data=await response.json();

    if(data.success){

        document.getElementById("status-"+id).innerText=data.status;

        updateDashboard();

    }

}

// ==============================
// AI ASSISTANT
// ==============================

function recommend(r){

const modal=document.getElementById("incidentModal");

const body=document.getElementById("modalBody");

body.innerHTML=`

<h3>AI Resource Recommendation</h3>

<hr><br>

<p><b>🚑 Ambulances</b> : ${r.ambulances}</p>

<p><b>🚒 Fire Units</b> : ${r.fire_units}</p>

<p><b>👮 Police Units</b> : ${r.police_units}</p>

<br>

<h3>Suggested Actions</h3>

<ul>

<li>Dispatch nearest emergency response team.</li>

<li>Notify district control room.</li>

<li>Monitor incident every 15 minutes.</li>

<li>Escalate if severity increases.</li>

</ul>

`;

modal.style.display="block";

}

function closeModal(){

document.getElementById("incidentModal").style.display="none";

}

window.onclick=function(e){

const modal=document.getElementById("incidentModal");

if(e.target===modal)

modal.style.display="none";

}

// ==============================
// STRATEGIC DASHBOARD
// ==============================

function updateDashboard(){

    const rows=document.querySelectorAll("#incidentTable tr");

    let active=0;
    let critical=0;

    rows.forEach(row=>{

        const priority=row.children[3].innerText;

        const status=row.children[4].innerText;

        if(status!=="Resolved")
            active++;

        if(priority.includes("High"))
            critical++;

    });

    const activeCard=document.getElementById("activeIncidents");
    const criticalCard=document.getElementById("criticalCount");
    const resourceCard=document.getElementById("availableResources");
    const summary=document.getElementById("aiSummary");

    if(activeCard) activeCard.innerText=active;
    if(criticalCard) criticalCard.innerText=critical;
    if(resourceCard) resourceCard.innerText=44-active;

    if(summary){

        if(critical>=2){

            summary.innerHTML=
            "<b>High Risk.</b> Recommend activating district emergency response and deploying additional resources.";

        }

        else if(active>=5){

            summary.innerHTML=
            "<b>Incident Load Increasing.</b> Consider requesting mutual aid from nearby districts.";

        }

        else{

            summary.innerHTML=
            "<b>Situation Stable.</b> Continue monitoring current incidents.";

        }

    }

}

updateDashboard();
