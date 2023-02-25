import { Text, Box } from "@chakra-ui/layout";
import { SearchDimensionInput } from "../components/input/SearchDimensionInput";

export const Home = () => {
  return (
    <Box margin={5} maxWidth={750}>
      <Text fontSize="3xl" fontWeight="bold">
        B7B - an open-source BEB dimension browser
      </Text>

      <Box marginTop={10}>
        <SearchDimensionInput size="lg" />
      </Box>

      <Text marginTop={10}>
        The BEB (Blockchain-Enabled Broadcast) protocol is an open messaging
        protocol for communities. It is simple enough for anyone to deploy their
        own self-hosted server, known as a {"dimension"} host. A server can host
        multiple dimensions!
      </Text>

      <Box marginTop={10}>
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

      <Box marginTop={5}>
        <Text fontSize="xl" fontWeight="bold">
          Here are some useful links to learn about the BEB protocol:
          <Text fontSize="xl" fontWeight="bold" color={"blue.600"}>
            <Box marginLeft={10}>
              <ul>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/bebverse/protocol"
                  >
                    github.com/bebverse/protocol
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/bebverse/universe"
                  >
                    github.com/bebverse/universe
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/bebverse/b7b"
                  >
                    github.com/bebverse/b7b
                  </a>
                </li>
              </ul>
            </Box>
          </Text>
        </Text>
      </Box>

      <Box marginTop={10}>
        <Text fontSize="md">
          <b>Disclaimer:</b> B7B is a browser for BEB dimensions, which are
          entirely self-hosted by third-parties. The developers and hosts of B7B
          are not responsible for the content of dimensions. Contact the host of
          the appropriate dimension to report any concerns.
        </Text>
      </Box>
    </Box>
  );
};
