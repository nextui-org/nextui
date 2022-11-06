import React from "react";
import {useTheme, Text, Button, Grid, Row} from "@nextui-org/react";

const DeleteUser: React.FC = () => {
  const {theme} = useTheme();

  return (
    <Grid.Container className="delete-user__container">
      <Row align="center" justify="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text>
          Are you sure you want to delete this user ?, by doing this, you will not be able to
          recover the data.
        </Text>
      </Row>
      <Grid.Container alignContent="center" justify="space-between">
        <Grid>
          <Button light size="sm">
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button shadow color="error" size="sm">
            Delete
          </Button>
        </Grid>
      </Grid.Container>
      <style jsx>
        {`
          :global(.delete-user__container) {
            max-width: 330px;
            border-radius: ${theme?.radii?.lg?.value};
            padding: ${theme?.space?.sm?.value};
          }
        `}
      </style>
    </Grid.Container>
  );
};

const MemoDeleteUser: React.FC = React.memo(DeleteUser);

export default MemoDeleteUser;
