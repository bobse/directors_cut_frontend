import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';

export const AboutPage = props => {
  return (
    <Box flexGrow={1} maxW={'800px'} mt={8}>
      <VStack spacing={8} fontSize={'md'} alignItems={'flex-start'} mb={8}>
        <Box>
          <Heading textStyle={'h2'}>About the project:</Heading>
          <Text>
            This is a personal project developed by Roberto Seba as a way for
            him to keep track of the upcoming projects and available movies from
            his favorite directors. Instead of creating a service only for
            himself, this became a pet project and it was developed with the
            idea of allowing others to have access to this service.{' '}
          </Text>
          <Text>
            Once you add your favorite directors, the service keeps constant
            track of them, using information from IMDB and TMDB, and whenever a
            new project is added to the directors on your list or an existing
            project becomes available, the service will email you the news.
          </Text>
        </Box>
        <Box>
          <Box>
            <Heading textStyle={'h2'}>Technical Details</Heading>
            <b>Backend:</b>
          </Box>
          <List spacing={2}>
            <Item>Language: Python</Item>
            <Item>
              Framework: <b>Django / Django Rest Framework</b>
            </Item>
            <Item>
              Database: Postgres (Trigram indexes for Director search) - Running
              on ComputeEngine due to budget constrains
            </Item>
            <Item>Deployed on: GCP / CloudRun using CloudBuild for CI/CD</Item>
            <Item>Scheduled Tasks: GCP / CloudRun Jobs / Google Scheduler</Item>
            <Item>
              Local Dev: Docker / Docker Compose with Postgres and PgAdmin
            </Item>
            <Item>
              Repository: Github (Code available for interviewers upon request)
            </Item>
            <Item>
              <a
                href="https://directorscut-q2mgsgixya-uc.a.run.app/api/schema/swagger-ui/"
                target={'_blank'}
                rel={'noreferrer'}
              >
                API Documentation (swagger-ui)
              </a>
            </Item>
            <Item>
              Third-party APIs and Datasets: IMDB (dataset) / TMDB API /
              OpenSubtitles API
            </Item>
          </List>
          <Box mt={4}>
            <b>Frontend:</b>
          </Box>
          <List spacing={2}>
            <Item>Javascript / React / Chakra UI</Item>
          </List>
        </Box>
        <ButtonStd as={RouterLink} to="/" label="Take me to the homepage" />
      </VStack>
    </Box>
  );
};

const Item = props => {
  return (
    <ListItem>
      <ListIcon as={ChevronRightIcon} />
      {props.children}
    </ListItem>
  );
};
