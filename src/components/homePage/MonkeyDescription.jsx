import { Typography, Grid } from "@material-ui/core";

const MonkeyDescription = (props) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ padding: "4em", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ maxWidth: "400px", paddingBottom: "2em" }}
      >
        <div
          style={{
            width: "100px",
            height: "3px",
            backgroundColor: "grey",
            textAlign: "center",
          }}
        ></div>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            lineHeight: "2.5rem",
            paddingTop: "1em",
            textAlign: "center",
          }}
          variant="body1"
          gutterBottom
        >
          This is what you get when buying a Monkey on the Block NFT
        </Typography>
        <Typography
          style={{ fontSize: "1rem", textAlign: "center" }}
          variant="body2"
          gutterBottom
        >
          Do you see any Teletubbies in here? Do you see a slender plastic tag
          clipped to my shirt with my name printed on it?
          <br />
          <br />
          Best NFT you will ever buy!
        </Typography>
      </Grid>

      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        style={{ gap: "1em" }}
      >
        <Grid
          item
          md={3}
          xs={12}
          style={{
            backgroundColor: "#fff",
            padding: "3em",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderRadius: "15px",
            maxWidth: "400px",
          }}
        >
          <Typography
            style={{ fontWeight: "bold", textAlign: "center" }}
            component="h2"
            variant="h5"
            gutterBottom
          >
            RARITY
          </Typography>
          <Typography
            style={{ color: "black", fontSize: "0.8rem" }}
            variant="body2"
            gutterBottom
          >
            Each MOTB has its own rarity to it. You can find monkeys from being
            super rare to very common. The Rarity of each monkey depends on the
            attributes and pieces it consists of.
          </Typography>
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          style={{
            backgroundColor: "#fff",
            padding: "3em",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
            borderRadius: "15px",
            maxWidth: "400px",
          }}
        >
          <Typography
            style={{ fontWeight: "bold", textAlign: "center" }}
            component="h2"
            variant="h5"
            gutterBottom
          >
            120 UNIQUE ATTRIBUTES
          </Typography>
          <Typography
            style={{ color: "black", fontSize: "0.8rem" }}
            variant="body2"
            gutterBottom
          >
            Each MOTB has its own rarity to it. You can find monkeys from being
            super rare to very common. The Rarity of each monkey depends on the
            attributes and pieces it consists of.
          </Typography>
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          style={{
            backgroundColor: "#fff",
            padding: "3em",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
            borderRadius: "15px",
            maxWidth: "400px",
          }}
        >
          <Typography
            style={{ fontWeight: "bold", textAlign: "center" }}
            component="h2"
            variant="h5"
            gutterBottom
          >
            PROOF OF OWNERSHIP
          </Typography>
          <Typography
            style={{ color: "black", fontSize: "0.8rem" }}
            variant="body2"
            gutterBottom
          >
            Each MOTB has its own rarity to it. You can find monkeys from being
            super rare to very common. The Rarity of each monkey depends on the
            attributes and pieces it consists of.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MonkeyDescription;
