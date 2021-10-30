import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar, AppBar, Toolbar, Typography, Link, Container, Grid } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";

import MonkeyDescription from "./components/homePage/MonkeyDescription";
import MonkeyAttributes from "./components/homePage/MonkeyAttributes";
import MonkeyTicker from "./components/homePage/MonkeyTicker";

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

const ConnectButton = styled(WalletDialogButton)`
  && {
    border-radius: 50px;
    padding: 0.4em 1em;
  }
`;
const AppBarStyled = styled(AppBar)`
  && {
    background-color: white;
    color: #222;
    box-shadow: none;
  }
`;
const ToolbarStyled = styled(Toolbar)`
  justify-content: space-between;
`;
const LinkStyled = styled(Link)`
  && {
    color: #222;
  }
  &:last-of-type {
    margin-right: 0px;
  }
`;

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const [toggleMenu, setToggleMenu] = useState(false);

  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
  
  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  function mobileMenuToggle() {
    setToggleMenu(!toggleMenu)
    document.body.classList.toggle("freeze");
  }

  return (
    <main>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert> 
      </Snackbar>
      
      <AppBarStyled position="static">
        <ToolbarStyled style={{ position: "relative"}}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img style={{ height: "50px", marginRight: "15px" }} src="/assets/img/MOTBLogo.png" alt="MOTB Logo" />
            <h1 style={{ display: "inline-block", background: "none", WebkitTextFillColor: "#444" }}>MOTB</h1>
          </div>
          <MenuIcon className="menu__icon" onClick={mobileMenuToggle}/>
          {
            toggleMenu ?
            <div className="mobile__background-blur"></div>
            : null
          }
          <div className={`menu ${toggleMenu ? 'show' : ''}`}>
          <Typography>
            <LinkStyled href="#" onClick={preventDefault}>
              Home
            </LinkStyled>
            <LinkStyled href="#" onClick={preventDefault}>
              Attributes
            </LinkStyled>
            <LinkStyled href="#" onClick={preventDefault}>
              My MOTBs
            </LinkStyled>
            <LinkStyled href="#" onClick={preventDefault}>
              Roadmap
            </LinkStyled>
            <LinkStyled href="#" onClick={preventDefault}>
              FAQ
            </LinkStyled>
          </Typography>
          { !wallet ? ( 
            <ConnectButton>Connect</ConnectButton>
          ) : (
            <MintContainer>
              <MintButton
                disabled={isSoldOut || isMinting || !isActive}
                onClick={onMint}
                variant="contained"
              >
                {isSoldOut ? (
                  "SOLD OUT"
                ) : isActive ? (
                  isMinting ? (
                    <CircularProgress />
                  ) : (
                    "BUY A MONKEY"
                  )
                ) : (
                  <Countdown
                    date={startDate}
                    onMount={({ completed }) => completed && setIsActive(true)}
                    onComplete={() => setIsActive(true)}
                    renderer={renderCounter}
                  />
                )}
              </MintButton>
              <p style={{ display: "inline", marginLeft: "20px" }}>{shortenAddress(wallet.publicKey.toBase58() || "")}</p>
            </MintContainer>
          )}
          </div>
          
        </ToolbarStyled>
      </AppBarStyled>
      
      <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
        <Typography style={{ fontSize: "58px" }} variant="h4" component="h1" gutterBottom>
          MONKEYS ON THE BLOCK
        </Typography>
        <Typography variant="body1" gutterBottom>
          10,000 uniquely generated, cute and collectible monkeys with proof
          of ownership stored on the Solana blockchain
        </Typography>
      </Container>

      <MonkeyTicker />
      <hr />

      <Container maxWidth="md" style={{ textAlign: "center", margin: "40px auto" }}>
        <Typography style={{ fontWeight: "bold" }} variant="h5" component="h2" gutterBottom>
          MINT A MONKEY
        </Typography>
        <Typography style={{ maxWidth: '60%', margin: '0 auto'}} variant="body1" gutterBottom>
          As social pack animals, monkeys prefer to live in groups. Mint a
          monkey by connecting your Phantom or Sollet wallet.
        </Typography>

          <Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={6}
            style={{ padding: '4em'}}
          >
            <Grid item xs={12} md={6}>
            
                  <img style={{ height: "200px" }} src="/assets/img/SingleCardBackside.png" alt="Single MOTB Card" />
                  <Typography style={{ fontWeight: "bold", paddingTop: "2em" }} variant="h6" component="h3" gutterBottom>
                    SINGLE MONKEY
                  </Typography>
                  <Typography variant="body2" style={{ paddingBottom: "2em"}} gutterBottom>
                    1x MOTB NFT<br />
                    4SOL <br />
                    = 4 SOL per NFT
                  </Typography>
                  { !wallet ? ( 
                      <ConnectButton>Connect</ConnectButton>
                    ) : (
                      <MintContainer>
                        <MintButton
                          disabled={isSoldOut || isMinting || !isActive}
                          onClick={onMint}
                          variant="contained"
                        >
                          {isSoldOut ? (
                            "SOLD OUT"
                          ) : isActive ? (
                            isMinting ? (
                              <CircularProgress />
                            ) : (
                              "BUY A MONKEY"
                            )
                          ) : (
                            <Countdown
                              date={startDate}
                              onMount={({ completed }) => completed && setIsActive(true)}
                              onComplete={() => setIsActive(true)}
                              renderer={renderCounter}
                            />
                          )}
                        </MintButton>
                      </MintContainer>
                    )}
            </Grid>
            
            <Grid item xs={12} md={6}>
            
                  <img style={{ height: "200px" }} src="/assets/temp-img/monkey-pack.png" alt="Single MOTB Card" />
                  <Typography style={{ fontWeight: "bold", paddingTop: "2em" }} variant="h6" component="h3" gutterBottom>
                    MONKEY PACK
                  </Typography>
                  <Typography variant="body2" style={{ paddingBottom: "2em"}} gutterBottom>
                    1x MOTB NFT<br />
                    4SOL <br />
                    = 4 SOL per NFT
                  </Typography>
                  { !wallet ? ( 
                      <ConnectButton>Connect</ConnectButton>
                    ) : (
                      <MintContainer>
                        <MintButton
                          disabled={isSoldOut || isMinting || !isActive}
                          onClick={onMint}
                          variant="contained"
                        >
                          {isSoldOut ? (
                            "SOLD OUT"
                          ) : isActive ? (
                            isMinting ? (
                              <CircularProgress />
                            ) : (
                              "BUY A MONKEY"
                            )
                          ) : (
                            <Countdown
                              date={startDate}
                              onMount={({ completed }) => completed && setIsActive(true)}
                              onComplete={() => setIsActive(true)}
                              renderer={renderCounter}
                            />
                          )}
                        </MintButton>
                      </MintContainer>
                    )}
            </Grid>

          </Grid>
        
      </Container>
      <hr />
          <MonkeyDescription />
      <hr />
          <MonkeyAttributes />
      
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
