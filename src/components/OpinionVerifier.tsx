import { TonConnectButton } from "@tonconnect/ui-react";
import { useOpinionVerifierContract } from "../hooks/useOpinionVerifierContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { useState } from "react";

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
  const { value, address, sendPredictionString, sendDeploy, getStatus } =
    useOpinionVerifierContract();

  const [perdictionString, setPerdictionString] = useState("41 Dash buy 1677053952 1677054040 69.71 USDT");


  return (
    <div className="Container">
      <TonConnectButton />

      <Card>
        <FlexBoxCol>
          <h3>OpinionVerifier</h3>
          <FlexBoxRow>
            <b>Address</b>
            <Ellipsis>{address}</Ellipsis>
          </FlexBoxRow>
          <FlexBoxRow>
            <b>Current stored hash: </b>
            <pre>{value ?? "Loading..."}</pre>
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
