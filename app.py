from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

resources = {
    "ambulances": 12,
    "fire_units": 8,
    "police_units": 24,
    "shelters": 5
}

incidents = [
    {
        "id": 1,
        "title": "Flood Warning",
        "location": "Sector A",
        "priority": "High",
        "status": "New",
        "time": datetime.now().strftime("%H:%M"),
        "recommendation": {
            "ambulances": 3,
            "fire_units": 2,
            "police_units": 5
        }
    },
    {
        "id": 2,
        "title": "Power Outage",
        "location": "Sector C",
        "priority": "Medium",
        "status": "Assigned",
        "time": datetime.now().strftime("%H:%M"),
        "recommendation": {
            "ambulances": 1,
            "fire_units": 0,
            "police_units": 2
        }
    }
]


def recommend(priority):
    if priority == "High":
        return {
            "ambulances":3,
            "fire_units":2,
            "police_units":5
        }

    if priority == "Medium":
        return {
            "ambulances":2,
            "fire_units":1,
            "police_units":3
        }

    return {
        "ambulances":1,
        "fire_units":0,
        "police_units":1
    }


@app.route("/")
def index():
    return render_template(
        "index.html",
        incidents=incidents,
        resources=resources
    )


@app.route("/add_incident",methods=["POST"])
def add():

    data=request.json

    rec=recommend(data["priority"])

    incident={

        "id":len(incidents)+1,

        "title":data["title"],

        "location":data["location"],

        "priority":data["priority"],

        "status":"New",

        "time":datetime.now().strftime("%H:%M"),

        "recommendation":rec

    }

    incidents.insert(0,incident)

    return jsonify(
        success=True,
        incident=incident
    )


@app.route("/update_status/<int:id>",methods=["POST"])
def update(id):

    workflow=[
        "New",
        "Assigned",
        "Contained",
        "Resolved"
    ]

    for i in incidents:

        if i["id"]==id:

            idx=workflow.index(i["status"])

            if idx<len(workflow)-1:

                i["status"]=workflow[idx+1]

            return jsonify(success=True,status=i["status"])

    return jsonify(success=False)


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
