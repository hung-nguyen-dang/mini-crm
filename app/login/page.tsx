'use client'

import { useState, ReactNode } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input, PasswordInput } from '@/components/ui/input'

const loginFormSchema = z.object({
  email: z.string().min(2, {
    message: 'Vui lòng nhập email.',
  }),
  password: z.string().min(2, {
    message: 'Vui lòng nhập mật khẩu.',
  }),
})

type LoginFormProps = {
  Logo: ReactNode
  Header?: ReactNode
  Footer?: ReactNode
  showForgotPassword?: boolean
}

export function Login({ Logo, Footer, Header }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setIsLoading(true)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center pt-24 min-h-dvh w-full">
      {Header ? Header : null}

      <main className="w-[300px] flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {Logo}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Đăng nhập
            </Button>
          </form>
        </Form>
      </main>

      {Footer ? Footer : null}
    </div>
  )
}

export default Login
