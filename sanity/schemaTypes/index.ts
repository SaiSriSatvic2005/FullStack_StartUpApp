import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType}from './categoryType'
import {postType} from './postType'
import { author } from './author'
import { startup } from './startup'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist, postType, categoryType, blockContentType],
}
