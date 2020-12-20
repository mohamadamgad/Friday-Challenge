import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loadCars } from "../reducer";
import styled from "styled-components";
import { Card } from "./Card";

export function HomePage() {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const vehicles = useSelector(state => state);
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
        setSelectedModel(model);
    }

    async function searchVehicles() {
        dispatch(loadCars(selectedMake, selectedModel));
    }

    return (
        <div>
            <SearchContainr>
                <DropDown id="makes" onChange={e => handleMake(e)}>
                    <option>Select Make</option>
                    {makes.length > 0 &&
                        makes.map((make, index) => {
                            return (
                                <option value={make} key={index}>
                                    {make}
                                </option>
                            );
                        })}
                </DropDown>

                <DropDown id="models" onChange={e => handleModel(e)}>
                    <option>Select Model</option>
                    {models.length > 0 &&
                        models.map((model, index) => {
                            return (
                                <option value={model} key={index}>
                                    {model}
                                </option>
                            );
                        })}
                </DropDown>

                <SearchButton onClick={searchVehicles}>Search</SearchButton>
            </SearchContainr>

            {vehicles.pending === false && vehicles.data.length === 0 && (
                <EmptyState> No vehicles available</EmptyState>
            )}
            <Card vehicles={vehicles.data} />
        </div>
    );
}

const SearchContainr = styled.div`
    margin: 40px 0;
    display: flex;
    justify-content: center;
`;

const SearchButton = styled.button`
    background: #23cba7;
    border: 0.5px solid #ddd;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
`;
const DropDown = styled.select`
    margin-right: 10px;
    font-size: 13px;
    padding: 6px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
    position: relative;
`;

const EmptyState = styled.div`
    display: flex;
    justify-content: center;
    font-size: 24px;
`;
