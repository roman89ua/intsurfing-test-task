import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { PokemonDetailsData } from "./types.ts";
import ErrorCP from "../../components/ErrorCP";
import CardSkeleton from "./CardSkeleton";

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getPokemonData = useCallback(async () => {
    if (!id) setError("No 'Id' was received from previous page.");
    setIsLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (e) {
      console.error(e);
      setError(
        `Something went wrong with current pokemon with id: ${id} data load.`,
      );
    } finally {
      // TODO This call delay was created specifically to display the loading indicator as per the specification

      setTimeout(() => setIsLoading(false), 2000);
    }
  }, [id]);

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  if (isLoading) {
    return <CardSkeleton />;
  }
  if (!id) {
    return (
      <ErrorCP
        message={`Something went wrong with current pokemon with id: ${id} data load.`}
      />
    );
  }

  if (error) {
    return <ErrorCP message={error} />;
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon?.name.toUpperCase()} ID: {pokemon?.id}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Weight {pokemon?.weight}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This pokemon has abilities:{" "}
            {pokemon?.abilities.map((ability) => (
              <span>{ability.ability.name}, </span>
            ))}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Other statistic data:
            <List>
              {pokemon?.stats.map((stat) => (
                <ListItem key={crypto.randomUUID()}>
                  <ListItemText
                    primary={`${stat.stat.name}: ${stat.base_stat}`}
                  />
                </ListItem>
              ))}
            </List>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </CardActions>
    </Card>
  );
};

export default PokemonDetails;
