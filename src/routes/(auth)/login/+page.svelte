<script lang="ts">
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<div class="card card-bordered w-full max-w-md shadow rounded-box">
  <div class="card-body">
    <h1 class="text-xl font-medium">Welcome back</h1>
    {#if form?.message}
      <div class="alert text-sm alert-error">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>{form.message}</span>
        </div>
      </div>
    {/if}
    <form action="/login" method="post" class="space-y-5 mt-2">
      <div class="form-control w-full">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">Username / email</span>
        </label>
        <input
          type="text"
          name="username"
          placeholder="example@gmail.com"
          class="input input-primary input-bordered w-full"
        />
      </div>
      <div class="form-control w-full">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          name="password"
          type="password"
          class="input input-primary input-bordered w-full"
          placeholder="******"
        />
      </div>

      <button class="btn btn-primary w-full" type="submit">Submit</button>
    </form>
  </div>
</div>
