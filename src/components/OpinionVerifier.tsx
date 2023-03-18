import { TonConnectButton } from "@tonconnect/ui-react";
import { useOpinionVerifierContract } from "../hooks/useOpinionVerifierContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { useUwizApi } from "../hooks/useUwizApi";
import { useState } from "react";
import { CHAIN } from "@tonconnect/protocol";
import axios from "axios";

import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Ellipsis,
  Button,
  Input,
} from "./styled/styled";

export function OpinionVerifier() {
  const { connected } = useTonConnect();
  const { value, address, balance, sendPredictionString, sendDeploy } =
    useOpinionVerifierContract();
  const {user} = useUwizApi();
  
  const [perdictionString, setPerdictionString] = useState("");

  const getPrediction = () => {
    axios.get("https://next.uwiz.ir/api/v3/opinion/post/4100611")
    .then(res => {
      setPerdictionString(res.data.hashable_string)
    }).catch(err => {console.error(err)})
  }


  return (
    <div className="Container">
      <TonConnectButton />

      <Card>
        <FlexBoxCol>
          <h3>OpinionVerifier</h3>
          <FlexBoxRow>
            <b>Address</b>
            <a href={`https://${CHAIN.TESTNET}.tonscan.org/address/${address}`}>{address}</a>
          </FlexBoxRow>
          <FlexBoxRow>
            <b>Current stored hash: </b>
            <pre>{value ?? "Loading..."}</pre>
          </FlexBoxRow>
          <FlexBoxRow>
            <b>Balance: </b>
            <pre>{balance ?? "Loading..."}</pre>
          </FlexBoxRow>
          <FlexBoxRow>
            <b>Balance: </b>
            <pre>{user ?? "Loading..."}</pre>
          </FlexBoxRow>
          <FlexBoxRow>
            <Input
              style={{ marginRight: 8 }}
              type="string"
              value={perdictionString}
              onChange={(e) => setPerdictionString(e.target.value)}
            ></Input>
          </FlexBoxRow>
          <Button
            disabled={false}
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={getPrediction}
          >
            Get Your latest perdiction
          </Button>
          <Button
            disabled={!connected}
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              sendPredictionString(perdictionString);
            }}
          >
            Verify prediction string
          </Button>
          <Button
            disabled={true}
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              sendDeploy();
            }}
          >
            Deploy
          </Button>
        </FlexBoxCol>
      </Card>
    </div>
  );
}

