<script lang="ts">
  import dayjs from 'dayjs';

  export let data: Comment;
</script>

<li class="group">
  <div class="space-y-1">
    <span class="font-bold">{data.commenter || 'Anonymous'}</span>
    <span class="text-xs opacity-80">
      • {dayjs(data.created).format('DD/MM/YYYY')}
    </span>
    <p>{data.content}</p>
  </div>
</li>
