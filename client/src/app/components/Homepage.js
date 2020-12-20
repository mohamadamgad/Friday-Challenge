import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loadCars } from "../reducer";
import { Card } from "./Card";

export function HomePage() {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const vehicles = useSelector(state => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function anyNameFunction() {
            const res = await axios.get(`http://localhost:8080/api/makes`);

            setMakes(res.data);
        })();
    }, []);

    async function handleMake(e) {
        const make = e.target.value;
        const res = await axios.get(
            `http://localhost:8080/api/models?make=${make}`
        );
        setModels(res.data);
        setSelectedMake(make);
    }

    function handleModel(e) {
        const model = e.target.value;
        console.log("modeeeeel", model);
        setSelectedModel(model);
    }

    async function searchVehicles() {
        dispatch(loadCars(selectedMake, selectedModel));
        // const res = await axios.get(
        //     `http://localhost:8080/api/vehicles?make=${selectedMake}&model=${selectedModel}`
        // );
        // setVehicles(res.data);
    }

    return (
        <div>
            <select id="makes" onChange={e => handleMake(e)}>
                <option>Select Make</option>
                {makes.length > 0 &&
                    makes.map((make, index) => {
                        return (
                            <option value={make} key={index}>
                                {make}
                            </option>
                        );
                    })}
            </select>

            <select id="models" onChange={e => handleModel(e)}>
                <option>Select Model</option>
                {models.length > 0 &&
                    models.map((model, index) => {
                        return (
                            <option value={model} key={index}>
                                {model}
                            </option>
                        );
                    })}
            </select>

            <button onClick={searchVehicles}>Search</button>

            <Card vehicles={vehicles} />
        </div>
    );
}
