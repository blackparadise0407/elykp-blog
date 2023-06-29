<script lang="ts">
  import dayjs from 'dayjs';

  export let data: Post;
</script>

<a
  href={`/${data.slug}`}
  class="w-full card card-compact rounded-box bg-primary hover:shadow-lg transition-all md:hover:scale-110"
>
  <div class="card-body prose">
    <div class="card-title flex-col items-start">
      <div class="flex items-center text-sm gap-2 font-medium text-primary-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{data.viewCounts}</span>
      </div>

      <div class="text-xl md:text-2xl font-extrabold text-primary-content">
        {data.title}
      </div>
      <span class="text-sm font-normal opacity-80 text-primary-content">
        {dayjs(data.created).format('MMM DD, YYYY')}
      </span>
    </div>
    <p class="text-primary-content line-clamp-4">{data.description}</p>
  </div>
</a>
