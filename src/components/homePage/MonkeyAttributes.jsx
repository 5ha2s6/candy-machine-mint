import { Container, Grid, Typography } from "@material-ui/core";

const MonkeyAttributes = (props) => {
  return (
    <Container
      maxWidth="md"
      style={{ textAlign: "center", margin: "40px auto", padding: "4em" }}
    >
      <img
        src="/assets/temp-img/all-cards.png"
        alt="Five Monkey cards"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        style={{ paddingTop: "4em" }}
      >
        <Grid
          item
          xs={12}
          md={4}
          style={{
            backgroundColor: "#fff",
            padding: "3em",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            borderRadius: "15px",
            maxWidth: "400px",
          }}
        >
          <Typography
            style={{ fontWeight: "bold" }}
            component="h2"
            variant="h5"
            gutterBottom
          >
            ATTRIBUTES
          </Typography>
          <Typography
            style={{ color: "black", fontSize: "0.8rem", textAlign: "left" }}
            variant="body2"
            gutterBottom
          >
            Each MOTB has its own rarity to it. You can find monkeys from being
            super rare to very common. The Rarity of each monkey depends on the
            attributes and pieces it consists of.
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <img
            src="/assets/temp-img/attributes.png"
            alt="Five Monkey cards"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MonkeyAttributes;
