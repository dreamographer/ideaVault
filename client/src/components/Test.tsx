import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
const Test = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const tutorialParam = searchParams.get("tutorial");
      const testParams = searchParams.get("data");

      return (
        <div onClick={() => setSearchParams({ data: "asdfas" })}>
          Tutorial: {testParams}
        </div>
      );


}

export default Test