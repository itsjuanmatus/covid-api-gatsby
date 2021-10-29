import React from "react"
import { Router as MyRouter } from "@reach/router"
import { CountryName } from "../modules/CountryName"

const Router = () => {
  return (
    <MyRouter>
      <CountryName path="/country/:results" />
    </MyRouter>
  )
}

export default Router