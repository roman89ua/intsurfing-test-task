import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";

const CardSkeleton = () => (
  <Card sx={{ minWidth: 500 }}>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton width={"100%"} height={32} />
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Skeleton width={"100%"} height={20} />
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Skeleton width={"100%"} height={20} />
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Skeleton width={"100%"} height={20} />
          <List>
            {Array(6)
              .fill(0)
              .map(() => (
                <ListItem key={crypto.randomUUID()}>
                  <Skeleton width={"100%"} height={20} />
                </ListItem>
              ))}
          </List>
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        <Skeleton width={"50%"} height={30} />
      </Button>
    </CardActions>
  </Card>
);

export default CardSkeleton;
