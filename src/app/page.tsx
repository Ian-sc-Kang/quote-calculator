"use client";

import { useEffect, useRef, useState } from "react";
import { fetchDumpsterPrice, fetchHaulerRate } from "./utils";

const MIN_ROI_MONTHS = 50;

async function validateZipCode(zipCode: string) {
  const res = await fetch(`/api/serviceCoverage?zipCode=${zipCode}`);
  const resJson = await res.json();
  return resJson.city;
}
export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [isServiceable, setIsServiceable] = useState(false);
  const [dumpsterQuantity, setDumpsterQuantity] = useState(1);
  const [dumpsterSize, setDumpsterSize] = useState(2);
  const [pickupFrequency, setPickupFrequency] = useState(1);
  const [haulerRate, setHaulerRate] = useState(0);
  const [previousRate, setPreviousRate] = useState(0);
  const [dumpsterTotalPrice, setDumpsterTotalPrice] = useState(0);
  const [LDAmount, setLDAmount] = useState(0);
  const [contractRate, setContractRate] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | HTMLSelectElement)[]>([]);

  useEffect(() => {
    async function fetchData() {
      const dumpsterPrice = await fetchDumpsterPrice(
        city,
        dumpsterSize,
        dumpsterQuantity
      );
      setDumpsterTotalPrice(dumpsterPrice);
      const haulerRate = await fetchHaulerRate(
        city,
        dumpsterSize,
        dumpsterQuantity,
        pickupFrequency
      );
      setHaulerRate(haulerRate);
    }
    fetchData();
  }, [city, dumpsterSize, dumpsterQuantity, pickupFrequency]);

  useEffect(() => {
    setLDAmount(previousRate * 6 + dumpsterTotalPrice + 230);
  }, [previousRate, dumpsterTotalPrice]);

  useEffect(() => {
    setContractRate(LDAmount / MIN_ROI_MONTHS + haulerRate);
  }, [LDAmount, haulerRate]);
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const city = await validateZipCode(zipCode);

          if (city) {
            window.alert("It's serviceable area!");
            setCity(city);
            setIsServiceable(true);
          } else {
            window.alert("It's unserviceable area!");
            setIsServiceable(false);
          }
        }}
      >
        <label htmlFor="zipCode"></label>
        <input
          type="search"
          placeholder="zip code"
          id="zipCode"
          name="zipCode"
          required
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
          autoFocus
          tabIndex={0}
        />
        <input type="submit" value="search" />
      </form>
      {isServiceable ? (
        <div>
          <form>
            <div>
              <label htmlFor="dumpsterQuantity">Dumpster Quantity</label>
              <input
                ref={(ref) => {
                  if (ref && !inputRefs.current.includes(ref)) {
                    inputRefs.current.push(ref);
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    inputRefs.current[1].focus();
                  }
                }}
                type="number"
                name="dumpsterQuantity"
                id="dumpsterQuantity"
                defaultValue={dumpsterQuantity}
                onChange={async (e) => {
                  const qty = Number(e.target.value);
                  setDumpsterQuantity(qty);
                }}
                tabIndex={1}
                autoFocus
              />{" "}
              ea
            </div>
            <div>
              <label htmlFor="dumpsterSize">Dumpster Size: </label>
              <input
                ref={(ref) => {
                  if (ref && !inputRefs.current.includes(ref)) {
                    inputRefs.current.push(ref);
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    inputRefs.current[2].focus();
                  }
                }}
                name="dumpsterSize"
                id="dumpsterSize"
                type="number"
                onChange={async (e) => {
                  const size = Number(e.target.value);
                  setDumpsterSize(size);
                }}
                defaultValue={dumpsterSize}
                tabIndex={2}
              />{" "}
              Yards
            </div>

            <div>
              <label htmlFor="pickupFrequency">Number Of Pickups</label>
              <select
                ref={(ref) => {
                  if (ref && !inputRefs.current.includes(ref)) {
                    inputRefs.current.push(ref);
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    inputRefs.current[3].focus();
                  }
                }}
                name="pickupFrequency"
                id="pickupFrequency"
                required
                onChange={async (e) => {
                  const freq = Number(e.target.value);
                  setPickupFrequency(freq);
                }}
                defaultValue={pickupFrequency}
                tabIndex={3}
              >
                <option value={1}>1 / week</option>
                <option value={2}>2 / week</option>
                <option value={3}>3 / week</option>
                <option value={4}>4 / week</option>
                <option value={5}>5 / week</option>
                <option value={6}>6 / week</option>
                <option value={0.5}>Every Other Week</option>
              </select>
            </div>
            <div>
              <label htmlFor="previousRate">Previous Rate $</label>
              <input
                ref={(ref) => {
                  if (ref && !inputRefs.current.includes(ref)) {
                    inputRefs.current.push(ref);
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    inputRefs.current[4].focus();
                  }
                }}
                name="previousRate"
                id="previousRate"
                type="number"
                value={previousRate.toString()}
                onChange={(e) => {
                  const rate = Number(e.target.value);
                  setPreviousRate(rate);
                }}
                tabIndex={4}
              />
            </div>
            <br />
            <div>
              <label htmlFor="dumpsterTotalPrice">Dumpster Price $</label>
              <input
                type="number"
                name="dumpsterTotalPrice"
                id="dumpsterTotalPrice"
                min="0"
                value={Number(dumpsterTotalPrice).toFixed(2)}
                disabled
              />
            </div>
            <div>
              <label htmlFor="haulerRate">Hauler Rate $</label>
              <input
                name="haulerRate"
                id="haulerRate"
                type="number"
                min="0"
                value={Number(haulerRate).toFixed(2)}
                disabled
              />
            </div>

            <div>
              <label htmlFor="LDAmount">LD AMount $</label>
              <input
                name="LDAmount"
                id="LDAmount"
                type="number"
                value={Number(LDAmount).toFixed(2)}
                disabled
              />
            </div>
            <br />
            <hr />
            <br />
            <div>
              <div>
                <b>15% Contract Rate</b>
              </div>
              <div>Contract Rate: ${(previousRate * 0.85).toFixed(2)}</div>
              <div>
                ROI Months:{" "}
                {Math.round(LDAmount / (previousRate * 0.85 - haulerRate))}{" "}
              </div>
              <br />
              <hr />
              <br />
              <div>
                <b>50 ROI Contract Rate</b>
              </div>
              <div>
                Contract Rate: $
                {Math.round(LDAmount / MIN_ROI_MONTHS + haulerRate)}
              </div>
              <div>
                {(
                  ((previousRate - (LDAmount / MIN_ROI_MONTHS + haulerRate)) /
                    previousRate) *
                  100
                ).toFixed(2)}
                % Discount
              </div>
              <br />
              <hr />
              <br />
              <div>
                <b>Adjustable Contract Rate</b>
              </div>

              <div>
                <label htmlFor="contractRate">Contract Rate $</label>
                <input
                  ref={(ref) => {
                    if (ref && !inputRefs.current.includes(ref)) {
                      inputRefs.current.push(ref);
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      inputRefs.current[0].focus();
                    }
                  }}
                  type="number"
                  name="contractRate"
                  id="contractRate"
                  value={Math.round(contractRate).toString()}
                  onChange={(e) => {
                    const rate = Number(e.target.value);
                    setContractRate(rate);
                  }}
                />
              </div>
              <span>
                min. ${Math.round(LDAmount / MIN_ROI_MONTHS + haulerRate)}
              </span>
              <input
                name="contractRateRange"
                id="contractRateRange"
                type="range"
                min={Math.round(LDAmount / MIN_ROI_MONTHS + haulerRate)}
                max={Math.round(LDAmount / 5 + haulerRate)}
                value={contractRate.toString()}
                onChange={(e) => {
                  const rate = Number(e.target.value);
                  setContractRate(rate);
                }}
                tabIndex={5}
              />
              <span>max. ${Math.round(LDAmount / 5 + haulerRate)}</span>
            </div>
            <div>
              Discount{" "}
              {Number(
                ((previousRate - contractRate) / previousRate) * 100
              ).toFixed(2)}
              %
            </div>
            <div>
              ROI Months: {Math.round(LDAmount / (contractRate - haulerRate))}
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
