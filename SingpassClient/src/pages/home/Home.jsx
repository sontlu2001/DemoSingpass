import { useEffect, useState } from 'react';
import React from 'react';
import {
  Box,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
} from '@chakra-ui/react';
import { SingpassAPI } from '../../apis/singpass';
import { useLocation } from 'react-router-dom';
import { set } from 'lodash';

export default function Home() {
  const location = useLocation();
  const [code, setCode] = useState(null);
  const [formData, setFormData] = useState({
    nric: '',
    fullname: '',
    dob: '',
    gender: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleRetrieveInfoFromSingpass = async () => {
    try {
      let appConfig = {};

      const appConfigResponse = await SingpassAPI.getEnv();

      const codeChallengeResponse = await SingpassAPI.generateCodeChallenge();
      
      console.log('codeChallengeResponse', codeChallengeResponse);

      if (!appConfigResponse.data || !codeChallengeResponse.data) {
        this.loadingSingpass = false;
        return;
      }

      appConfig = appConfigResponse.data;
      appConfig.codeChallenge = codeChallengeResponse.data.codeChallenge;
      appConfig.method = 'S256';

      
      const authorizeUrl =
        appConfig.authApiUrl +
        '?client_id=' +
        appConfig.clientId +
        '&scope=' +
        appConfig.scope +
        '&purpose_id=' +
        appConfig.purpose_id +
        '&code_challenge=' +
        appConfig.codeChallenge +
        '&code_challenge_method=' +
        appConfig.method +
        '&redirect_uri=' +
        appConfig.redirectUrl;

        console.log('authorizeUrl', authorizeUrl);
      window.location.href = authorizeUrl;

      // const element = document.createElement('a');
      // element.href = authorizeUrl;
      // element.click();
    } catch (error) {
      console.log(error);
      this.loadingSingpass = false;
      this.$notify.error({
        title: 'Error',
        message: MESSAGES.error.tryAgain,
      });
    }
  };

  const populateFormFromSingpass = async (codeFromURL) => {
    try {
      if (!codeFromURL) return;
      const payload = {
        authCode: codeFromURL,
      };

      const response = await SingpassAPI.getPersonData(payload);
      const data = response.data;

      if (!data) return;

        setFormData({
          nric: data?.uinfin.value,
          fullname: data?.name.value,
          dob: data?.dob.value,
          gender: data?.sex.desc,
          email: data?.email.value,
        })
    } catch (error) {
      console.log(error);

      this.loadingSingpass = false;
      this.$notify.error({
        title: 'Error',
        message: MESSAGES.error.tryAgain,
      });
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const codeFromURL = queryParams.get('code');

    if (codeFromURL) {
      populateFormFromSingpass(codeFromURL);
    }
  }, [location]);

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Button
            onClick={handleRetrieveInfoFromSingpass}
            colorScheme="orange"
            type="outline">
            Retrieve MyInfo
          </Button>
          {/* NRIC */}
          <FormControl isRequired>
            <FormLabel htmlFor="nric">NRIC</FormLabel>
            <Input
              id="nric"
              name="nric"
              value={formData.nric}
              onChange={handleChange}
              placeholder="Enter NRIC"
            />
          </FormControl>

          {/* Fullname */}
          <FormControl isRequired>
            <FormLabel htmlFor="fullname">Full Name</FormLabel>
            <Input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter Full Name"
            />
          </FormControl>

          {/* Date of Birth */}
          <FormControl isRequired>
            <FormLabel htmlFor="dob">Date of Birth</FormLabel>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Select Date of Birth"
            />
          </FormControl>

          {/* gender */}
          <FormControl isRequired>
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <Input
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Enter gender"
            />
          </FormControl>

          {/* Email */}
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            colorScheme="green"
            width="full"
            variant="solid"
            type="outline">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
