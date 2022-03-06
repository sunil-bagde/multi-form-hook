import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSwr } from "lib/axios";
import { useToggle } from "hooks";
import { nanoid } from "nanoid";
function App() {
  const { reset, register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      type: "international",
      fromAccount: "",
      name: "Name",
      address: "Address",
      city: "City",
    },
  });
  const formReset = () => {
    reset({
      type: "international",
      fromAccount: "",
      name: "",
      address: "",
      city: "",
    });
  };
  const { errors } = formState;
  const [editIndex, setEditIndex] = useState(-1);
  const onSubmit = (data) => {
    if (editIndex >= 0) {
      payments[editIndex] = data;
      setPayments(payments);
      formReset();
      setEditIndex(-1)
      return;
    }
    const updatePaymets = {
      ...data,
      id: nanoid(),
    };
    payments.push(updatePaymets);
    setPayments(payments);
    formReset();
  };
  const {
    data: accounts,
    error,
    mutate,
  } = useSwr("http://localhost:3000/accounts");
  const [accountToggle, setAccountToggle] = useToggle(false);

  const [payments, setPayments] = useState([]);
  if (!accounts) {
    return <h1 className="flex justify-center items-center">Loading...</h1>;
  }

  return (
    <div className="mt-2 mx-auto max-w-xl border-solid border border-gray-300  py-2 px-2">
      <form>
        <div className="flex flex-col  ">
          <div className="flex flex-wrap items-center justify-between  pt-2">
            <label className="  px-2 py-2 w-48 " htmlFor="type">
              Payment type
            </label>
            <select
              className=" px-2 py-2 flex-1 border"
              id="type"
              {...register("type")}
            >
              <option value="international">International</option>
              <option value="domestic">Domestic</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center justify-between  pt-2">
            <label className="  px-2 py-2 w-48 " htmlFor="type">
              From account
            </label>
            <select
              className=" px-2 py-2 flex-1 border"
              id="type"
              {...register("fromAccount")}
            >
              <option value="">Select account</option>
              {accounts.map(({ id, name }) => {
                return (
                  <option key={id} value="international">
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <label className="  px-2 py-2   " htmlFor="type">
            To account
          </label>
          <div className="col-span-2 w-full mt-2 pl-1">
            <div>
              <label className="  px- py-2   " htmlFor="type">
                Name
              </label>
              <input
                type="text"
                className="mt-2  px-2 py-2 w-full  border"
                {...register("name")}
              />
            </div>
            <div>
              <label className="  px- py-2   " htmlFor="type">
                Address
              </label>
              <input
                type="text"
                className="mt-2  px-2 py-2 w-full  border"
                {...register("address")}
              />
            </div>
            <div>
              <label className="  px- py-2   " htmlFor="type">
                City
              </label>
              <input
                type="text"
                className="mt-2  px-2 py-2 w-full  border"
                {...register("city")}
              />
            </div>
          </div>
        </div>
        <div className="  flex justify-end pt-6">
          <button
            onClick={handleSubmit(onSubmit)}
            className="cursor-pointer   border px-4 py-2 bg-red-700 text-white"
            type="button"
          >
            {editIndex < 0 ? "Add payment" : "Edit payment"}
          </button>
        </div>
      </form>
      <div className="mt-8 -mb-3">
        <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
          <div
            style={{ backgroundPosition: "10px 10px" }}
            className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
          />
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-hidden my-5">
              <table className="border-collapse table-fixed w-full text-sm">
                <thead>
                  <tr>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Type
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      From account
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      To account
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Name
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                  {payments.map(
                    (
                      { id, type, fromAccount, name, city, address },
                      paymentIndex
                    ) => {
                      return (
                        <tr key={id}>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                            {type}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                            {fromAccount}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                            {name}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            {address} {city}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400 flex flex flex-col items-start">
                            <button
                              className="px-1 py-1 cursor-pointer"
                              onClick={() => {
                                const payment = payments[paymentIndex];
                                reset(payment);
                                setEditIndex(paymentIndex);
                              }}
                            >
                              {`Edit`}
                            </button>
                            <button className="px-1 py-1 cursor-pointer">
                              {`Delete`}
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5" />
        </div>
      </div>
    </div>
  );
}

export default App;
