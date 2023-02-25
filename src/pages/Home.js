import { Text, Box } from "@chakra-ui/layout";

export const Home = () => {
  return (
    <Box marginLeft={10} maxWidth={750}>
      <Text fontSize="3xl" fontWeight="bold">
        Welcome to b7b, the BEB dimension browser!
      </Text>

      <Text>
        The BEB (Blockchain-Enabled Broadcast) protocol is an open messaging
        network, similar to SMTP, but designed for wallet communication. It is
        simple enough for anyone to deploy their own self-hosted server, known
        as a {"dimension"} host. A server can host multiple dimensions!
      </Text>

      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Here are some dimensions to get you started:
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={"blue.600"}>
          <Box marginLeft={10}>
            <ul>
              <li>
                <a href="#/d/playground.beb">playground.beb</a>
              </li>
              <li>
                <a href="#/d/music.beb">music.beb</a>
              </li>
              <li>
                <a href="#/d/wholesome-memes.beb">wholesome-memes.beb</a>
              </li>
            </ul>
          </Box>
        </Text>
      </Box>

      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Here are some useful links to learn about the BEB protocol:
          <Text fontSize="xl" fontWeight="bold" color={"blue.600"}>
            <Box marginLeft={10}>
              <ul>
                <li>
                  <a href="https://github.com/bebverse/protocol">
                    github.com/bebverse/protocol
                  </a>
                </li>
                <li>
                  <a href="https://github.com/bebverse/universe">
                    github.com/bebverse/universe
                  </a>
                </li>
              </ul>
            </Box>
          </Text>
        </Text>
      </Box>
    </Box>
  );
};
