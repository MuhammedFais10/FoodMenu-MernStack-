import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../Components/hooks/useAuth'
import Title from '../../Components/Title/Title'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import classes from './profilePage.module.css'
//import { updateProfile } from '../../Services/userServices'
import ChangePassword from '../../Components/ChangePassword/ChangePassword'

export default function ProfilePage() {
  
  const {
    handleSubmit,
    register,
    formState:{errors},
  } = useForm()

  const { user, updateProfile } = useAuth();
  

  
 const submit = user =>{
 updateProfile(user)
 }

  return (
   <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(submit)}>
          <Input
            defaultValue={user.name}
            type="text"
            label="Name"
            {...register('name', {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />
          <Input
            defaultValue={user.address}
            type="text"
            label="Address"
            {...register('address', {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Update" backgroundColor="#009e84" />
        </form>

        <ChangePassword/>
      </div>
    </div>
  )
}
