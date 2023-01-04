import { Button } from '@windmill/react-ui';
import { useStateMachine } from 'little-state-machine';
import React, { useState } from 'react';
import { useNavigate, useRouteMatch } from 'react-router-dom';
import Error from '../../components/form/Error';
import InputArea from '../../components/form/InputArea';
import EnsInput from '../../components/form/EnsInput';
import HeaderNavigator from '../../components/header-navigator/HeaderNavigator';
import useQuery from '../../hooks/useQuery';
import useSignupSubmit from '../../hooks/useSignupSubmit';
import { updateSignupInfo } from '../SignUp/updateAction';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { notifyError } from '../../utils/toast';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import AuthServices from '../../services/AuthServices';

const RegSubdomain = () => {
  const query = useQuery();
  const { actions, state } = useStateMachine({ updateSignupInfo });

  const { register, handleSubmit, errors, loading, getValues } =
    useSignupSubmit(state);

  const navigate = useNavigate();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  const handleMeta = async (data) => {
    console.log('Handle');
    try {
      if (!isConnected) {
        const { account, chain } = await connectAsync({
          connector: new InjectedConnector(),
        });
      }

      let { msg } = await AuthServices.registerSub({
        subDomain: 'Sub?',
      });
      console.log(msg);
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <div className="p-4">
      <HeaderNavigator back />
      <form>
        <div className="flex flex-col h-full space-y-10">
          <div className="text-2xl font-bold mb-2">
            Get your <br />
            RedLetter Subdomain
          </div>

          <div className="flex flex-col items-center my-12">
            <EnsInput
              register={register}
              name="ens"
              type="text"
              placeholder="abc.redletter.eth"
            />

            <Error errorName={errors.ens} />
          </div>

          <div>
            <Button
              disabled={loading}
              className="mt-4 h-12 w-full"
              block
              onClick={() => handleMeta()}
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegSubdomain;
