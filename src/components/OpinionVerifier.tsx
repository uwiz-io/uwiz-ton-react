import { TonConnectButton } from "@tonconnect/ui-react";
import { useOpinionVerifierContract } from "../hooks/useOpinionVerifierContract";
import { useTonConnect } from "../hooks/useTonConnect";

import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Ellipsis,
  Button,
} from "./styled/styled";

export function OpinionVerifier() {
  const { connected } = useTonConnect();
  const { value, address, deployed, sendPredictionString, sendDeploy } = useOpinionVerifierContract();

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
            <b>Value</b>
            <div>{value ?? "Loading..."}</div>
          </FlexBoxRow>
          <Button
            disabled={!connected}
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              sendPredictionString();
            }}
          >
            Increment
          </Button>
          <Button
            disabled={deployed}
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
