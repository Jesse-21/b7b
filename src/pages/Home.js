import { Text, Box, Link } from "@chakra-ui/layout";
import { SearchDimensionInput } from "../components/input/SearchDimensionInput";

export const Home = () => {
  return (
    <Box margin={5} maxWidth={750}>
      <Text fontSize="3xl" fontWeight="bold">
        B7B - an{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/bebverse/b7b"
          color="blue.600"
        >
          open-source
        </Link>{" "}
        BEB dimension browser
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
      <Text marginTop={2}>
        Dimensions are queried against the{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/bebverse/contracts/blob/main/src/Resolver.sol"
          color="blue.600"
        >
          deployed resolver contract
        </Link>
        , which allows domain holders to map their domain to their{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/bebverse/universe"
          color="blue.600"
        >
          self-hosted server
        </Link>
        .
      </Text>

      <Box marginTop={10}>
        <Text fontSize="xl" fontWeight="bold">
          Here are some dimensions to get you started:
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          <Box marginLeft={10}>
            <ul>
              <li>
                <Link color="blue.600" href="/d/playground.beb">
                  playground.beb
                </Link>
              </li>
              <li>
                <Link color="blue.600" href="/d/music.beb">
                  music.beb
                </Link>
              </li>
              <li>
                <Link color="blue.600" href="/d/wholesome-memes.beb">
                  wholesome-memes.beb
                </Link>
              </li>
            </ul>
          </Box>
        </Text>
      </Box>

      <Box marginTop={5}>
        <Text fontSize="xl" fontWeight="bold">
          Here are some useful links to learn about the BEB protocol:
          <Text fontSize="xl" fontWeight="bold">
            <Box marginLeft={10}>
              <ul>
                <li>
                  <Link
                    color="blue.600"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/bebverse/protocol"
                  >
                    github.com/bebverse/protocol
                  </Link>
                </li>
                <li>
                  <Link
                    color="blue.600"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/bebverse/universe"
                  >
                    github.com/bebverse/universe
                  </Link>
                </li>
                <li>
                  <Link
                    color="blue.600"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/bebverse/b7b"
                  >
                    github.com/bebverse/b7b
                  </Link>
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
